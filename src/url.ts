
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import Utils from './utils';

/* URL */

type URLArg = 
  | {page: 'home' | 'issues' | 'pulls' | 'actions' | 'projects' | 'wiki' | 'settings' | 'releases'}
  | {view: 'blob' | 'blame' | 'commits', branch: 'master' | 'working tree'};

const URL = {

  async get (arg: URLArg) {

    const repopath = await Utils.repo.getPath ();

    if ( !repopath ) return vscode.window.showErrorMessage ( 'You have to open a git project before being able to open it in GitHub' );

    const git = Utils.repo.getGit ( repopath ),
          repourl = await Utils.repo.getUrl ( git );

    if ( !repourl ) return vscode.window.showErrorMessage ( 'Remote repository not found' );

    if ( 'page' in arg ) {

      if (arg.page === 'home') return repourl

      return _.compact ([ repourl, arg.page ]).join ( '/' );
  
    } else {

      const {activeTextEditor} = vscode.window;

      if ( !activeTextEditor ) return vscode.window.showErrorMessage ( 'You have to open a file before being able to open it in GitHub' );

      const editorPath = activeTextEditor.document.uri.fsPath;

      let filePath = editorPath ? editorPath.substring ( repopath.length + 1 ).replace( /\\/g, '/' ) : undefined;

      if ( !filePath ) {

        return repourl
      
      }

      let lines = '';

      const selections = activeTextEditor.selections;

      if ( selections.length === 1 ) {

        const selection = selections[0];

        if ( !selection.isEmpty ) {

          if ( selection.start.line === selection.end.line ) {

            lines = `#L${selection.start.line + 1}`;

          } else {

            lines = `#L${selection.start.line + 1}-L${selection.end.line + 1}`;

          }

        }

      }

      const hash = await Utils.repo.getHash ( git, arg.branch );

      filePath = encodeURIComponent ( filePath ).replace ( /%2F/g, '/' );
  
      return _.compact ([ repourl, arg.view, hash, filePath ]).join ( '/' ) + lines;

    }
  },

  async copy ( arg: URLArg ) {

    const url = await URL.get ( arg );

    await vscode.env.clipboard.writeText ( url );

    vscode.window.showInformationMessage ( 'Permalink copied to clipboard!' );

  },

  async open ( arg: URLArg ) {

    const url = await URL.get ( arg );

    vscode.env.openExternal ( vscode.Uri.parse ( url ) );

  }

};

/* EXPORT */

export default URL;
