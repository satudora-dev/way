import { fireStore } from '../firebase';
const projectRef = fireStore.collection('projects');

export const updateProject = (projectID, updatingParams) => dispatch => {
  projectRef.doc(projectID).update(updatingParams)
    .catch(error => dispatch({
      type: 'UPDATE_PROJECTS_ERROR',
      message: error.message,
    }));
}

const fetchProjectsSuccess = projects => {
  return {
    type: 'RECEIVE_PROJECTS_DATA',
    data: projects
  }
}

const fetchProjects = () => dispatch => {
  projectRef.onSnapshot((snapshot) => {
    let projects={};
    snapshot.docs.forEach((doc) => {
      projects[doc.id]=doc.data();
    })
    dispatch(fetchProjectsSuccess(projects));
  })
}

const shouldFetchProjects = (state) => {
  const projects = state.projects;
  if (!projects) {
    return true;
  } else {
    return false;
  }
}

export const fetchProjectsIfNeeded = () => (dispatch, getState) => {
  if (!shouldFetchProjects(getState())) {
    return dispatch(fetchProjects());
  }
}

export const updateDescription = (projectID, newDescription) => {
  return updateProject(projectID, {'description': newDescription})
}
