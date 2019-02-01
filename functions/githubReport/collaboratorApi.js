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


function fetchCollaborators(accessToken, user, repository){
  const baseUrl = "https://api.github.com/repos/"
  return fetchGetJsonResponse(baseUrl + user + '/' + repository + '/collaborators',
    {
      Authorization: "token " + accessToken
    })
};


function fetchUserFromCollaborator(collaboratorJson, accessToken){
  return fetchGetJsonResponse(collaboratorJson.url,
    {
      Authorization: "token " + accessToken
    })
}


function fetchCollaboratorsForReport(accessToken, user, repository){
  const result = fetchCollaborators(accessToken, user, repository).then(function(collaborators){
    let promises = []
    for(const collaborator of collaborators){
      promises.push(fetchUserFromCollaborator(collaborator, accessToken))
    }
    const _result = Promise.all(promises)
      .then(function (users) {
        let collaboratorDict = {}
        for(const user of users){
          collaboratorDict[user.login] =
            {
              "name": user.name,
              "iconUrl": user.avatar_url,
            }
        }
        return collaboratorDict
      }).catch((error) => {
        console.log(error)
      });
    return _result.then((__result)=>{
      return __result
    })
  })
  return result
}

module.exports = {
  fetchCollaboratorsForReport: fetchCollaboratorsForReport
}
