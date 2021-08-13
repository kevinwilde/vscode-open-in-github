
/* IMPORT */

import URL from './url';

/* COMMANDS */

function openProject () {

  return URL.open ({ page: 'home' });

}

// function openIssues () {

//   return URL.open ({ page: 'issues' });

// }

// function openPullRequests () {

//   return URL.open ({ page: 'pulls' });

// }

// function openActions () {

//   return URL.open ({ page: 'actions' });

// }

// function openProjects () {

//   return URL.open ({ page: 'projects' });

// }

// function openWiki () {

//   return URL.open ({ page: 'wiki' });

// }

// function openSettings () {

//   return URL.open ({ page: 'settings' });

// }

// function openReleases () {

//   return URL.open ({ page: 'releases' });

// }

function openFile () {

  return URL.open ({ view: 'blob', branch: 'working tree' });

}

function openFileHistory () {

  return URL.open ({ view: 'commits', branch: 'working tree' });

}

function openFileBlame () {

  return URL.open ({ view: 'blame', branch: 'working tree' });

}

function copyFileLink () {

  return URL.copy ({ view: 'blob', branch: 'working tree' });

}

function openFileOnMaster () {

  return URL.open ({ view: 'blob', branch: 'master' });

}

function openFileHistoryOnMaster () {

  return URL.open ({ view: 'commits', branch: 'master' });

}

function openFileBlameOnMaster () {

  return URL.open ({ view: 'blame', branch: 'master' });

}

function copyFileLinkOnMaster () {

  return URL.copy ({ view: 'blob', branch: 'master' });

}

/* EXPORT */

export {
  openProject,
  // openIssues,
  // openPullRequests,
  // openActions,
  // openProjects,
  // openWiki,
  // openSettings,
  // openReleases,
  openFile,
  openFileHistory,
  openFileBlame,
  copyFileLink,
  openFileOnMaster,
  openFileHistoryOnMaster,
  openFileBlameOnMaster,
  copyFileLinkOnMaster,
};
