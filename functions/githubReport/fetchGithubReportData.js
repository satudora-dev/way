'use strict';

const fetch = require("node-fetch");
const functions = require('firebase-functions');
const commitApi = require('./commitApi.js')
const issueApi = require('./issueApi.js')
const collaboratorApi = require('./collaboratorApi.js')
const pullRequestAPI = require('./pullRequestApi.js')
//const githubAccessToken = functions.config().github.access_token;


module.exports = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    console.log(fetchGithubReportData())
    res.status(200).end('success: called github api )')
  }else{
    res.status(200).end('fail: require GET request to call github api')
  }
})


const collaboratorsTestData = {
  awakia:
    { name: 'Naoyoshi Aikawa',
      iconUrl: 'https://avatars3.githubusercontent.com/u/272083?v=4' },
  gakuh:
    { name: 'Gaku Hagiwara',
      iconUrl: 'https://avatars2.githubusercontent.com/u/1020048?v=4' },
  sono8stream:
    { name: 'Tomohiko Hasegawa',
      iconUrl: 'https://avatars2.githubusercontent.com/u/16527271?v=4' },
  TetsuFe:
    { name: 'Satoshi Yoshio',
      iconUrl: 'https://avatars0.githubusercontent.com/u/24940519?v=4' },
  yasunari89:
    { name: 'Yasunari Ota',
      iconUrl: 'https://avatars1.githubusercontent.com/u/32453142?v=4' },
  KoheiAsano:
    { name: 'Kohei Asano',
      iconUrl: 'https://avatars3.githubusercontent.com/u/32860920?v=4' },
  kitamuyu:
    { name: 'Yu Kitamura',
      iconUrl: 'https://avatars2.githubusercontent.com/u/33745987?v=4' } }


const commitsTestData =
  { KoheiAsano: 1,
    'Tomohiko Hasegawa': 1,
    yasunari89: 16,
    'DESKTOP-HF3GHF6\\sono8': 1 }


const issuesTestData =
{ yasunari89:
   { openIssue: { issues: ["Array"], count: 2 },
     closedIssue: { issues: ["Array"], count: 6 } },
  sono8stream:
   { openIssue: { issues: ["Array"], count: 3 },
     closedIssue: { issues: ["Array"], count: 5 } },
  TetsuFe:
   { openIssue: { issues: ["Array"], count: 5 },
     closedIssue: { issues: ["Array"], count: 2 } },
  kitamuyu:
   { openIssue: { issues: ["Array"], count: 3 },
     closedIssue: { issues: ["Array"], count: 3 } },
  gakuh: { openIssue: { issues: ["Array"], count: 2 } },
  KoheiAsano:
   { openIssue: { issues: ["Array"], count: 2 },
     closedIssue: { issues: ["Array"], count: 5 } } }


async function fetchGithubReportData(githubAccessToken){
  const issues = await issueApi.fetchIssues(githubAccessToken)
  const pullRequests = await pullRequestAPI.fetchAndBuildRepoUserPullRequestCountDict(githubAccessToken, Object.keys(collaboratorsTestData))
  return buildWeeklyReport(collaboratorsTestData, commitsTestData, issues, pullRequests)
}


function buildWeeklyReport(collaborators, commits, issues, pullRequests){
  let weeklyReport = {}
  for(const collaboratorKey of Object.keys(collaborators)){
    weeklyReport[collaboratorKey] = Object.assign((issues[collaboratorKey] || {}), (pullRequests[collaboratorKey] || {}))
    Object.assign(weeklyReport[collaboratorKey], collaborators[collaboratorKey])
    weeklyReport[collaboratorKey]["commitCount"] = commits[collaboratorKey] || 0
  }
  return weeklyReport
}


async function main() {
  const githubAccessToken = process.env['GITHUB_ACCESS_TOKEN'];
  const reportData = await fetchGithubReportData(githubAccessToken);
  console.log(reportData);
}


main();
