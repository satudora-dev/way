import { firebaseDB } from '../firebase';
const Accountref = firebaseDB.ref('accounts');
const Positionref = firebaseDB.ref('positions');
const Projectref = firebaseDB.ref('projects');
const Tagref = firebaseDB.ref('tags');
const Userref = firebaseDB.ref('users');

const loadAccountsSuccess = snapshot => {
  return {
    type: 'ACCOUNTS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const loadAccountsError = error => {
  return {
    type: 'ACCOUNTS_RECEIVE_ERROR',
    message: error.message
  }
}

export const loadAccounts = () => dispatch => {
  Accountref.off()
  Accountref.on('value',
    (snapshot) => {dispatch(loadAccountsSuccess(snapshot))},
    (error) => {dispatch(loadAccountsError(error))}
  )
}

const loadPositionsSuccess = snapshot => {
  return {
    type: 'POSITIONS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const loadPositionsError = error => {
  return {
    type: 'POSITIONS_RECEIVE_ERROR',
    message: error.message
  }
}

export const loadPositions = () => dispatch => {
  Positionref.off()
  Positionref.on('value',
    (snapshot) => {dispatch(loadPositionsSuccess(snapshot))},
    (error) => {dispatch(loadPositionsError(error))}
  )
}

const loadProjectsSuccess = snapshot => {
  return {
    type: 'PROJECTS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const loadProjectsError = error => {
  return {
    type: 'PROJECTS_RECEIVE_ERROR',
    message: error.message
  }
}

export const loadProjects = () => dispatch => {
  Projectref.off()
  Projectref.on('value',
    (snapshot) => {dispatch(loadProjectsSuccess(snapshot))},
    (error) => {dispatch(loadProjectsError(error))}
  )
}

const loadTagsSuccess = snapshot => {
  return {
    type: 'TAGS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const loadTagsError = error => {
  return {
    type: 'TAGS_RECEIVE_ERROR',
    message: error.message
  }
}

export const loadTags = () => dispatch => {
  Tagref.off()
  Tagref.on('value',
    (snapshot) => {dispatch(loadTagsSuccess(snapshot))},
    (error) => {dispatch(loadTagsError(error))}
  )
}

const loadUsersSuccess = snapshot => {
  return {
    type: 'USERS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const loadUsersError = error => {
  return {
    type: 'USERS_RECEIVE_ERROR',
    message: error.message
  }
}

export const loadUsers = () => dispatch => {
  Userref.off()
  Userref.on('value',
    (snapshot) => {dispatch(loadUsersSuccess(snapshot))},
    (error) => {dispatch(loadUsersError(error))}
  )
}














const setCurrentUser = email  => {
  return {
    type: 'SET_CURRENT_USER',
    email: email
  }
}

export const loginAsUser = email => dispatch => {
  dispatch(setCurrentUser(email))
}

export const editName = (names, userid) => dispatch => {
  Userref.child(userid).update({given:names[0],family:names[1]})
    .catch(error => dispatch({
      type: 'EDIT_NAME_ERROR',
      message: error.message,
    }));
}

export const addTag = (tagname, userid) => dispatch => {
  Userref.child(userid + `/tags/${tagname}`).set(true)
    .catch(error => dispatch({
      type: 'TAG_ADD_ERROR',
      message: error.message,
    }));
  Tagref.child(tagname + `/${userid}`).set(true)
    .catch(error => dispatch({
      type: 'TAG_ADD_ERROR',
      message: error.message,
    }));
}
export const deleteTag = (tagname, userid) => dispatch => {
  Userref.child(userid + `/tags/${tagname}`).remove()
    .catch(error => dispatch({
      type: 'TAG_DELETE_ERROR',
      message: error.message,
    }));
  Tagref.child(tagname + `/${userid}`).remove()
    .catch(error => dispatch({
      type: 'TAG_DELETE_ERROR',
      message: error.message,
    }));
}

export const addPosition = (position, userid) => dispatch => {
  Userref.child("position").set(position)
    .catch(error => dispatch({
      type: 'ADD_POSITION_ERROR',
      message: error.message,
    }));
  Positionref.child(position+`/${userid}`).set(true)
    .catch(error => dispatch({
      type: 'ADD_POSITION_ERROR',
      message: error.message,
    }));
}


export const setProjects = (projects, userid) => dispatch => {
  for(let project of projects){
    Userref.child(userid + `/projects/+${project}`).set(true)
      .catch(error => dispatch({
        type: 'SET_PROJECTS_ERROR',
        message: error.message,
      }));
    Projectref.child(project + `/members/ + ${userid}`).set(true)
      .catch(error => dispatch({
        type: 'SET_PROJECTS_ERROR',
        message: error.message,
      }));
  }
}
