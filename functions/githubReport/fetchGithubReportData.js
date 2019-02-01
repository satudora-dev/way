'use strict';

const functions = require('firebase-functions');
//const commitApi = require('./commitApi.js')
const issueApi = require('./issueApi.js')
const collaboratorApi = require('./collaboratorApi.js')
const pullRequestAPI = require('./pullRequestApi.js')
const githubAccessToken = functions.config().github.access_token;


/*
  - request parameters
    - user
    - repository
 */
module.exports = functions.https.onRequest(async (req, res) => {
  if (req.method === 'GET') {
    const user = req.query.user;
    const repository = req.query.repository;
    console.log(user, repository)
    const reportData = await fetchGithubReportData(githubAccessToken, user, repository);
    console.log(reportData);
    res.status(200).end('success: called github api )')
  }else{
    res.status(200).end('fail: require GET request to call github api')
  }
})


const commitsTestData =
  { KoheiAsano: 1,
    'Tomohiko Hasegawa': 1,
    yasunari89: 16,
    'DESKTOP-HF3GHF6\\sono8': 1 }

/*
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
*/


async function fetchGithubReportData(githubAccessToken, user, repository){
  try{
    const collaborators = await collaboratorApi.fetchCollaboratorsForReport(githubAccessToken, user, repository);
    const issues = await issueApi.fetchIssues(githubAccessToken, user, repository);
    const pullRequests = await pullRequestAPI.fetchAndBuildRepoUserPullRequestCountDict(githubAccessToken, user, repository, Object.keys(collaborators));
    return buildWeeklyReport(collaborators, commitsTestData, issues, pullRequests)
  }catch(error){
    console.log(error.message)
  }
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


/* for local test
async function main() {
  const githubAccessToken = process.env['GITHUB_ACCESS_TOKEN'];
  const accountName = 'satudora-digital';
  const repositoryName = 'way';
  const reportData = await fetchGithubReportData(githubAccessToken, accountName, repositoryName);
  console.log(reportData);
}


main();
*/
