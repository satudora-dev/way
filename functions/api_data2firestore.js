
module.exports = storeApiData;

async function storeApiData(fireStore, date, apiData) {
  //Divide apiData
  let data = splitApiData(apiData);
  
  let baseRef = fireStore.collection('githubReports');
  for (user in data) {
    let userDbRef = baseRef.doc(user.id);
    await storeUserData(dbRef, data.userData);// called for first time?

    let statDbRef = userDbRef.collection('stats').doc(date);
    await storeCommitData(statDbRef, data.commitData);
    await storePRData(statDbRef, data.prData);
    await storeClosedIssueData(fireStore,statDbRef, data.closedIssueData);
    await storeOpenIssueData(fireStore,statDbRef, data.openIssueData);
  }
  return 'complete!';
}

//return data = { user1: {...}, user2: {...}, ... }
function splitApiData(apiData) {
  let data;

  return data;
}

function storeUserData(dbRef, userData) {
  let data;
  //Format userData to data

  return dbRef.set(data);
}

function storeCommitData(dbRef, commitData) {
  let data;
  //Format commitData to data
  
  return dbRef.update({
    'commitCnt': data.commitCnt,
    'commitUrls': data.commitUrls,
  });
}

function storePRData(dbRef, prData) {
  let data;
  //Format commitData to data

  return dbRef.update({
    'prCnt': data.prCnt,
    'prUrls': data.prUrls,
  });
}

function storeClosedIssueData(fireStore,dbRef, issueData) {
  let data;
  //Format issueData to data

  let batch = fireStore.batch();
  let collectionRef = dbRef.collection('closedIssues');
  for (issue in data) {
    batch.update(collectionRef.doc(issue.id), {
      'labels': issue.labels,
      'url': issue.url,
    });
  }

  return batch.commit();
}

function storeOpenIssueData(fireStore,dbRef, issueData) {
  let data;
  //Format issueData to data

  let batch = fireStore.batch();
  let collectionRef = dbRef.collection('openIssues');
  for (issue in data) {
    batch.update(collectionRef.doc(issue.id), {
      'labels': issue.labels,
      'url': issue.url,
    });
  }

  return batch.commit();
}