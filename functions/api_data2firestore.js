module.exports.storeData = storeApiData;

async function storeApiData(fireStore, apiData) {
    let nowDate = new Date();
    let today = `${nowDate.getFullYear()}`;
    if (nowDate.getMonth() + 1 < 10) {
        today += '0';
    }
    today += `${nowDate.getMonth() + 1}${nowDate.getDate()}`;

    let baseRef = fireStore.collection('githubReports');
    for (user in apiData) {
        let data = formatUserData(apiData[user]);
        let userDbRef = baseRef.doc(user);
        await userDbRef.set(data.profile, { merge: true });

        let statDbRef = userDbRef.collection('stats').doc(today);
        await statDbRef.set(data.commitData, { merge: true });
        await statDbRef.set(data.pullRequestData, { merge: true });
        await storeClosedIssueData(fireStore, statDbRef, data.closedIssueData);
        await storeOpenIssueData(fireStore, statDbRef, data.openIssueData);
    }
    return 'complete!';
}

function formatUserData(userData) {
    let data = {};
    data.profile = { 'name': userData.name, 'iconUrl': userData.iconUrl };
    data.commitData = { 'commitCount': userData.commitCount };
    data.pullRequestData = {
        'mergedPullRequestCount': userData.mergedPullRequestCount,
        'createdPullRequestCount': userData.createdPullRequestCount,
    };
    data.closedIssueData = {
        'count': userData.closedIssueCount,
        'issues': userData.closedIssues,
    };
    data.openIssueData = {
        'count': userData.openIssueCount,
        'issues': userData.openIssues,
    };
    return data;
}

function storeClosedIssueData(fireStore, dbRef, issueData) {
    if (!issueData.count) return null;

    let batch = fireStore.batch();
    batch.set(dbRef,{ 'closedIssueCount': issueData.count }, { merge: true });
    let collectionRef = dbRef.collection('closedIssues');
    for (issue in issueData.issues) {
        batch.set(collectionRef.doc(issue), {
            'labels': issueData.issues[issue].labels,
            'url': issueData.issues[issue].url,
        }, { merge: true });
    }

    return batch.commit();
}

function storeOpenIssueData(fireStore, dbRef, issueData) {
    if (!issueData.count) return;

    let batch = fireStore.batch();
    batch.set(dbRef, { 'openIssueCount': issueData.count }, { merge: true });
    let collectionRef = dbRef.collection('openIssues');
    for (issue in issueData.issues) {
        batch.set(collectionRef.doc(issue), {
            'labels': issueData.issues[issue].labels,
            'url': issueData.issues[issue].url,
        }, { merge: true });
    }

    return batch.commit();
}