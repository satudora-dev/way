'use strict';

// https://developer.github.com/v3/issues/

const fetch = require("node-fetch");

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


function fetchRepoIssues(accessToken, user, repository){
  const baseUrl = "https://api.github.com/repos/"
  return fetchGetJsonResponse(baseUrl + user + '/' + repository + '/issues',
    {
      Authorization: "token " + accessToken
    })
};


function fetchRepoAllIssues(accessToken, user, repository, state='open', issues=[], pageNum=1){
  const baseUrl = "https://api.github.com/repos/"
  const fetchUrl = baseUrl + user + '/' + repository + '/issues' + '?page=' + pageNum + '&per_page=100' + '&state=' + state
  return fetchGetJsonResponse(fetchUrl,
    {
      Authorization: "token " + accessToken
    })
    .then(function(result){
      if(result.length !== 0){
        const accumulatedIssues = issues.concat(result)
        const nextPageNum = pageNum + 1
        return fetchRepoAllIssues(accessToken, user, repository, state, accumulatedIssues, nextPageNum)
      }else{
        return issues
      }
    })
    .catch(function(error){
      return issues
    });
};


function fetchUserFromCollaborator(collaboratorJson){
  return fetchGetJsonResponse(collaboratorJson.url)
}

const accessToken = 'xxx'


/*
 * return
 * {
 *  'labels': []
 *  'html_url': ''
 *  'assignees': []
 * }
 */
function fetchRepoAllOpenIssues(){
  const repoOpenIssues = fetchRepoAllIssues(accessToken, 'satudora-digital', 'way', 'open').then(function(repoIssues){
    let openIssueCount = 0
    let openIssueList = []
    for(const i in repoIssues){
      if(!repoIssues[i].pull_request){
        const assignees = repoIssues[i].assignees
        openIssueCount += 1
        openIssueList.push(
          {
            'id': repoIssues[i].number,
            'url': repoIssues[i].html_url,
            'assignees': repoIssues[i].assignees.map((assignee) => assignee.login),
            'labels': repoIssues[i].labels.map((assignee) => assignee.name),
          }
        )
      }
    }
    return openIssueList
  })
  return repoOpenIssues
}


/*
 * return
 * {
 *  'labels': []
 *  'html_url': ''
 *  'assignees': []
 * }
 */
function fetchRepoAllClosedIssues(){
  const repoClosedIssues = fetchRepoAllIssues(accessToken, 'satudora-digital', 'way', 'closed').then(function(repoIssues){
    let closedIssueCount = 0
    let closedIssueList = []
    for(const i in repoIssues){
      if(!repoIssues[i].pull_request){
        const assignees = repoIssues[i].assignees
        closedIssueCount += 1
        closedIssueList.push(
          {
            'id': repoIssues[i].number,
            'url': repoIssues[i].html_url,
            'assignees': repoIssues[i].assignees.map((assignee) => assignee.login),
            'labels': repoIssues[i].labels.map((assignee) => assignee.name),
          }
        )
      }
    }
    return closedIssueList
  })
  return repoClosedIssues
}


//fetchRepoAllClosedIssues().then(function(repoClosedIssues){console.log(repoClosedIssues)})
//fetchRepoAllOpenIssues().then(function(repoOpenIssues){console.log(repoOpenIssues)})


// issueType: "openIssues" or "closedIssues"
function buildUserIssuesDict(repoIssues, issueType){
  if(issueType === undefined){
    throw new Error()
  }

  let userIssuesDict = {}
  for(const i in repoIssues){
    const issue = repoIssues[i]
    const assignees = issue.assignees
    for (const i in assignees){
      const assignee = assignees[i]
      if(userIssuesDict[assignee] !== undefined){
        userIssuesDict[assignee][issueType][issue.id] =
          {
            'url': issue.url,
            'labels': issue.labels,
          }
      }else{
        userIssuesDict[assignee] =
          {
            [issueType]: {
              [issue.id]:
                {
                  'url': issue.url,
                  'labels': issue.labels,
                }
            }
          }
      }
    }
  }
  return userIssuesDict
}


function mergeOpenAndCloseIssues(repoClosedIssues, repoOpenIssues){
  const userOpenIssuesDict = buildUserIssuesDict(repoOpenIssues, "openIssues")
  const userClosedIssuesDict = buildUserIssuesDict(repoClosedIssues, "closedIssues")
  let mergeUserIssuesDict = {}
  const allOpenIssueAssignees = Object.keys(userOpenIssuesDict)
  const allClosedIssueAssignees = Object.keys(userClosedIssuesDict)
  const allAssignees = new Set(allOpenIssueAssignees.concat(allClosedIssueAssignees))
  for(const assignee of allAssignees){
    if(mergeUserIssuesDict[assignee] === undefined){
      mergeUserIssuesDict[assignee] = {}
    }
    if(userOpenIssuesDict[assignee]){
      mergeUserIssuesDict[assignee]["openIssues"] = userOpenIssuesDict[assignee]["openIssues"]
      mergeUserIssuesDict[assignee]["openIssueCount"] = Object.keys(userOpenIssuesDict[assignee]["openIssues"]).length
    }
    if(userClosedIssuesDict[assignee]){
      mergeUserIssuesDict[assignee]["closedIssues"] = userClosedIssuesDict[assignee]["closedIssues"]
      mergeUserIssuesDict[assignee]["closedIssueCount"] = Object.keys(userClosedIssuesDict[assignee]["closedIssues"]).length
    }
  }
  //console.log(mergeUserIssuesDict)
  return mergeUserIssuesDict
}


function fetchIssues(){
  const result = fetchRepoAllClosedIssues().then(function(repoClosedIssues){
    const openResult = fetchRepoAllOpenIssues().then(function(repoOpenIssues){
      return mergeOpenAndCloseIssues(repoClosedIssues, repoOpenIssues)
    })
    return openResult
  })
  return result
}


module.exports = {
  fetchIssues: fetchIssues
}
