
/* IMPORT */

import * as _ from 'lodash';
import * as absolute from 'absolute';
import * as findUp from 'find-up';
import * as path from 'path';
import * as pify from 'pify';
import simpleGit from 'simple-git';
import * as vscode from 'vscode';
import * as Commands from './commands';
import Config from './config';

/* UTILS */

const Utils = {

  initCommands ( context: vscode.ExtensionContext ) {

    const {commands} = vscode.extensions.getExtension ( 'kevinwilde.vscode-open-in-github' ).packageJSON.contributes;

    commands.forEach ( ({ command, title }) => {

      const commandName = _.last ( command.split ( '.' ) ) as string,
            handler = Commands[commandName],
            disposable = vscode.commands.registerCommand ( command, () => handler () );

      context.subscriptions.push ( disposable );

    });

    return Commands;

  },

  folder: {

    getRootPath ( basePath? ) {

      const {workspaceFolders} = vscode.workspace;

      if ( !workspaceFolders ) return;

      const firstRootPath = workspaceFolders[0].uri.fsPath;

      if ( !basePath || !absolute ( basePath ) ) return firstRootPath;

      const rootPaths = workspaceFolders.map ( folder => folder.uri.fsPath ),
            sortedRootPaths = _.sortBy ( rootPaths, [path => path.length] ).reverse (); // In order to get the closest root

      return sortedRootPaths.find ( rootPath => basePath.startsWith ( rootPath ) );

    },

    async getWrapperPathOf ( rootPath, cwdPath, findPath ) {

      const foundPath = await findUp ( findPath, { cwd: cwdPath } );

      if ( foundPath ) {

        const wrapperPath = path.dirname ( foundPath );

        return wrapperPath;
      }

    }

  },

  repo: {

    getGit ( repopath ) {

      return pify ( _.bindAll ( simpleGit ( repopath ), ['branch', 'getRemotes'] ) );

    },

    async getHash ( git, branch: 'master' | 'working tree' ) {

      const config = Config.get ();

      if (branch === 'master') {

        return ( await git.revparse ([ '--short', config.remote.branch ]) ).trim ();

      }
      
      return ( await git.revparse ([ '--short', 'HEAD' ]) ).trim ();

    },

    async getPath () {

      const {activeTextEditor} = vscode.window,
            editorPath = activeTextEditor && activeTextEditor.document.uri.fsPath,
            rootPath = Utils.folder.getRootPath ( editorPath );

      if ( !rootPath ) return false;

      return await Utils.folder.getWrapperPathOf ( rootPath, editorPath || rootPath, '.git' );

    },

    async getUrl ( git ) {

      const config = Config.get (),
            remotes = await git.getRemotes ( true ),
            remotesGithub = remotes.filter ( remote => ( remote.refs.fetch || remote.refs.push ).includes ( config.github.domain ) ),
            remoteOrigin = remotesGithub.filter ( remote => remote.name === config.remote.name )[0],
            remote = remoteOrigin || remotesGithub[0];

      if ( !remote ) return;

      const ref = remote.refs.fetch || remote.refs.push,
            re = /\.[^.:/]+[:/]([^/]+)\/(.*?)(?:\.git|\/)?$/,
            match = re.exec ( ref );

      if ( !match ) return;

      return `https://${config.github.domain}/${match[1]}/${match[2]}`;

    }

  }

};

/* EXPORT */

export default Utils;
