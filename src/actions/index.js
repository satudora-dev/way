import { firebaseDB, firebaseStorage, firebaseAuth  } from '../firebase';

const accountRef = firebaseDB.ref('accounts');
const positionRef = firebaseDB.ref('positions');
const projectRef = firebaseDB.ref('projects');
const tagRef = firebaseDB.ref('tags');
const userRef = firebaseDB.ref('users');

const fetchAccountsSuccess = snapshot => {
  return {
    type: 'ACCOUNTS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const fetchAccountsError = error => {
  return {
    type: 'ACCOUNTS_RECEIVE_ERROR',
    message: error.message
  }
}



const fetchPositionsSuccess = snapshot => {
  return {
    type: 'POSITIONS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const fetchPositionsError = error => {
  return {
    type: 'POSITIONS_RECEIVE_ERROR',
    message: error.message
  }
}


const fetchProjectsSuccess = snapshot => {
  return {
    type: 'PROJECTS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const fetchProjectsError = error => {
  return {
    type: 'PROJECTS_RECEIVE_ERROR',
    message: error.message
  }
}



const fetchTagsSuccess = snapshot => {
  return {
    type: 'TAGS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const fetchTagsError = error => {
  return {
    type: 'TAGS_RECEIVE_ERROR',
    message: error.message
  }
}



const fetchUsersSuccess = snapshot => {
  return {
    type: 'USERS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

const fetchUsersError = error => {
  return {
    type: 'USERS_RECEIVE_ERROR',
    message: error.message
  }
}

const setCurrentUser = ownKey  => {
  return {
    type: 'SET_CURRENT_USER',
    ownKey: ownKey
  }
}

export const initFetchIfLoggedIn = () => dispatch => {
  firebaseAuth().onAuthStateChanged(user=>{
    if(user){
      accountRef.off()
      accountRef.on('value',
        (snapshot) => {dispatch(fetchAccountsSuccess(snapshot))},
        (error) => {dispatch(fetchAccountsError(error))}
      )
      positionRef.off()
      positionRef.on('value',
        (snapshot) => {dispatch(fetchPositionsSuccess(snapshot))},
        (error) => {dispatch(fetchPositionsError(error))}
      )
      projectRef.off()
      projectRef.on('value',
        (snapshot) => {dispatch(fetchProjectsSuccess(snapshot))},
        (error) => {dispatch(fetchProjectsError(error))}
      )
      tagRef.off()
      tagRef.on('value',
        (snapshot) => {dispatch(fetchTagsSuccess(snapshot))},
        (error) => {dispatch(fetchTagsError(error))}
      )
      userRef.off()
      userRef.on('value',
        (snapshot) => {dispatch(fetchUsersSuccess(snapshot))},
        (error) => {dispatch(fetchUsersError(error))}
      )
      accountRef.orderByChild('email').equalTo(user.email).once('value', (snapshot) =>{
        let ownKey = Object.keys(snapshot.val())[0];
        dispatch(setCurrentUser(ownKey))
      })
    }else{
      dispatch(setCurrentUser(null))
    }
  })
}
