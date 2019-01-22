import { fireStore } from '../firebase';


const githubReportsRef=fireStore.collection('githubReports');
// const accountsRef=fireStore.collection('accounts');
// const positionsRef=fireStore.collection('positions');
// const projectsRef=fireStore.collection('projects');
// const tagsRef=fireStore.collection('tags');

const fetchGithubReportsSuccess = reports => {
  return {
    type: 'RECEIVE_GITHUBREPORTS_DATA',
    data: reports
  }
}

export const fetchGithubReports = () => dispatch => {
  githubReportsRef.onSnapshot((snapshot) => {
    let reports={};
    snapshot.docs.forEach((doc) => {
      reports[doc.id]=doc.data();
    })
    dispatch(fetchGithubReportsSuccess(reports));
  })
}
