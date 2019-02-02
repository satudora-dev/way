'use strict';

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


function fetchRepoEvents(accessToken, user, repository){
  const baseUrl = "https://api.github.com/repos/"
  return fetchGetJsonResponse(baseUrl + user + '/' + repository + '/events',
    {
      Authorization: "token " + accessToken
    })
};


function fetchRepoEventsPage10(accessToken, user, repository){
  const baseUrl = "https://api.github.com/repos/"
  return fetchGetJsonResponse(baseUrl + user + '/' + repository + '/events' + '?page=1&per_page=100',
    {
      Authorization: "token " + accessToken
    })
};


function fetchRepoAllEvents(accessToken, user, repository, events=[], pageNum=1){
  const baseUrl = "https://api.github.com/repos/"
  const fetchUrl = baseUrl + user + '/' + repository + '/events' + '?page=' + pageNum + '&per_page=100'
  //console.log(fetchUrl)
  return fetchGetJsonResponse(fetchUrl,
    {
      Authorization: "token " + accessToken
    })
    .then(function(result){
      if(result.length !== 0){
        const accumulatedEvents = events.concat(result)
        const nextPageNum = pageNum + 1
        return fetchRepoAllEvents(accessToken, user, repository, accumulatedEvents, nextPageNum)
      }else{
        return events
      }
    }).catch(function(error){
      return events
    });
};


function fetchRepoDetails(accessToken, user, repository){
  const baseUrl = "https://api.github.com/repos/"
  return fetchGetJsonResponse(baseUrl + user + '/' + repository,
    {
      Authorization: "token " + accessToken
    })
};


function fetchUserFromCollaborator(collaboratorJson){
  return fetchGetJsonResponse(collaboratorJson.url)
}

const accessToken = 'xxx'

function isInThisWeek(iso8601String){
  const nowDate = new Date();
  const statsStartDate = new Date(nowDate.setDate(nowDate.getDate() - 7));
  return new Date(iso8601String) > statsStartDate
}


function fetchWeeklyUserCommitCount(){
  let userCommitCountDict = {
  }
  const result = fetchRepoAllEvents(accessToken, 'satudora-digital', 'way').then(function(repoEvents){
    const pushEvents = repoEvents.filter((repoEvent) => repoEvent.type === 'PushEvent')
    for(const i in pushEvents){
      const pushEvent = pushEvents[i]
      const commits = pushEvent.payload.commits
      for(const i in commits){
        if(isInThisWeek(pushEvent.created_at)){
          if(userCommitCountDict[commits[i].author.name] !== undefined){
            userCommitCountDict[commits[i].author.name] += 1
          }else{
            userCommitCountDict[commits[i].author.name] = 1
          }
        }else{
          break
        }
      }
    }
    const oldestCommit = pushEvents[pushEvents.length-1].payload.commits[pushEvents[pushEvents.length-1].payload.commits.length-1]
    fetchGetJsonResponse(oldestCommit.url,
      {
        Authorization: "token " + accessToken
      })
      .then(function(commit){
        console.log("oldest commits github api cloud fetch: " + commit.commit.committer.date)
      })
    return userCommitCountDict
  })
  return result
}

module.exports = {
  fetchWeeklyUserCommitCount: fetchWeeklyUserCommitCount
}
