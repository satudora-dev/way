'use strict';

const fetch = require("node-fetch");
const functions = require('firebase-functions');

module.exports = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    fetchRepositoryUserProfiles()
    res.status(200).end('success: called github api )')
  }else{
    res.status(200).end('fail: require GET request to call github api')
  }
})


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


function fetchUserFromCollaborator(collaboratorJson){
  return fetchGetJsonResponse(collaboratorJson.url)
}


function fetchRepositoryUserProfiles(){
  const githubAccessToken = functions.config().github.access_token;
  fetchCollaborators(githubAccessToken, 'satudora-digital', 'way').then(function(collaborators){
    console.log(collaborators)
    for(const i in collaborators){
      fetchUserFromCollaborator(collaborators[i]).then(function(user){
        console.log(user.login, user.name, user.avatar_url)
      })
    }
  })
}
