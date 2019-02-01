'use strict';

const fetch = require("node-fetch");


function isInThisWeek(iso8601String){
  const nowDate = new Date();
  const statsStartDate = new Date(nowDate.setDate(nowDate.getDate() - 7));
  return new Date(iso8601String) > statsStartDate
}


function fetchGetJsonResponse(url, headerParams = {}){
  return fetch(url,
    {
      headers: headerParams
    }
  ).then(function(response){
    if(response.ok) {
      return response.json()
    }else{
      throw new Error('Network response was not ok.');
    }
  }).catch(function(error) {
    throw new Error('There has been a problem with your fetch operation: ', error.message);
  });
}


function fetchRepoAllPullRequests(accessToken, user, repository, state='open', pullRequests=[], pageNum=1){
  const baseUrl = "https://api.github.com/repos/"
  const fetchUrl = baseUrl + user + '/' + repository + '/pulls' + '?page=' + pageNum + '&per_page=100' + '&state=' + state
  return fetchGetJsonResponse(fetchUrl,
    {
      Authorization: "token " + accessToken
    })
    .then(function(result){
      if(result.length !== 0){
        const accumulatedIssues = pullRequests.concat(result)
        const nextPageNum = pageNum + 1
        return fetchRepoAllPullRequests(accessToken, user, repository, state, accumulatedIssues, nextPageNum)
      }else{
        return pullRequests
      }
    })
    .catch(function(error){
      return pullRequests
    });
};


function extractWeeklyCreatedPullRequests(pullRequests){
  return pullRequests.filter((pr) => isInThisWeek(pr.created_at))
}


function extractWeeklyMergedPullRequests(pullRequests){
  return pullRequests.filter((pr) => isInThisWeek(pr.merged_at))
}


function fetchAndBuildRepoUserPullRequestCountDict(accessToken, user, repository, collaboratorLoginNames){
  const repoOpenIssues = fetchRepoAllPullRequests(accessToken, user, repository, 'all').then(function(pullRequests){
    const createdPullRequests = extractWeeklyCreatedPullRequests(pullRequests)
    const mergedPullRequests = extractWeeklyMergedPullRequests(pullRequests)
    let userPullRequestDict = {}
    for(const loginName of collaboratorLoginNames){
      userPullRequestDict[loginName] = {}
      userPullRequestDict[loginName]['createdPullRequestCount'] = createdPullRequests.filter(pr => pr.user.login === loginName).length

      userPullRequestDict[loginName]['mergedPullRequestCount'] = 0
      for(const mergedPR of mergedPullRequests){
        const requested_reviewers = mergedPR.requested_reviewers.map((rr) => rr.login)
        if(requested_reviewers.includes(loginName)){
          userPullRequestDict[loginName]['mergedPullRequestCount'] += 1
        }
      }
    }
    return userPullRequestDict
  })
  return repoOpenIssues
}


module.exports = {
  fetchAndBuildRepoUserPullRequestCountDict: fetchAndBuildRepoUserPullRequestCountDict
}


/*
const collaborators = {
    awakia:
    { name: 'Naoyoshi Aikawa',
        avatar_url: 'https://avatars3.githubusercontent.com/u/272083?v=4' },
    gakuh:
    { name: 'Gaku Hagiwara',
        avatar_url: 'https://avatars2.githubusercontent.com/u/1020048?v=4' },
    sono8stream:
    { name: 'Tomohiko Hasegawa',
        avatar_url: 'https://avatars2.githubusercontent.com/u/16527271?v=4' },
    TetsuFe:
    { name: 'Satoshi Yoshio',
        avatar_url: 'https://avatars0.githubusercontent.com/u/24940519?v=4' },
    yasunari89:
    { name: 'Yasunari Ota',
        avatar_url: 'https://avatars1.githubusercontent.com/u/32453142?v=4' },
    KoheiAsano:
    { name: 'Kohei Asano',
        avatar_url: 'https://avatars3.githubusercontent.com/u/32860920?v=4' },
    kitamuyu:
    { name: 'Yu Kitamura',
        avatar_url: 'https://avatars2.githubusercontent.com/u/33745987?v=4' } }

fetchAndBuildRepoUserPullRequestCountDict(Object.keys(collaborators)).then(result => console.log(result))
*/
