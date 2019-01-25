'use strict';

const functions = require('firebase-functions');

function showGitLog(){
  const clone = require('simple-git')().clone('https://github.com/TetsuFe/my-official-site.git', './');
  console.log(clone.log());
}


module.exports = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    showGitLog()
    res.status(200).end('success: called github api )')
  }else{
    res.status(200).end('fail: require GET request to call github api')
  }
})
