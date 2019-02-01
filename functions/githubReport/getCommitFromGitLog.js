'use strict';

const functions = require('firebase-functions');

/* TODD: repoNameのところを任意にする */
async function fetchRepositoryIfNeededAndShowLog(){
  const fs = require('fs');
  const path = './repoName';

  try {
    fs.statSync(path);
    await showGitLog(path);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await require('simple-git')().clone('https://github.com/TetsuFe/my-official-site.git', './repoName');
      await showGitLog(path);
    } else {
      console.log('予期しないエラーが発生しました。');
    }
  }
}


async function showGitLog(path){
  const git = await require('simple-git')
  git(path).raw(
    [
      'log',
      '--no-merges',
      '--date=short',
      '--pretty=%h %cd %an %d %s'
    ], (err, result) => {
      console.log(result)
    });
  /* 以下の書き方にするとundefinedになる
  const log = await require('simple-git')('./repoName').log();
  console.log(log);
  */
}


module.exports = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    showGitLog()
    res.status(200).end('success: called github api )')
  }else{
    res.status(200).end('fail: require GET request to call github api')
  }
})


/* test */
//fetchRepositoryIfNeededAndShowLog();
