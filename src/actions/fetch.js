import { fireStore, firebaseAuth} from '../firebase';


const usersRef=fireStore.collection('users');
const accountsRef=fireStore.collection('accounts');
const positionsRef=fireStore.collection('positions');
const projectsRef=fireStore.collection('projects');
const tagsRef=fireStore.collection('tags');


const fetchAccountsSuccess = accounts => {
  return {
    type: 'RECEIVE_ACCOUNTS_DATA',
    data: accounts
  }
}

const fetchPositionsSuccess = positions => {
  return {
    type: 'RECEIVE_POSITIONS_DATA',
    data: positions
  }
}


const fetchProjectsSuccess = projects => {
  return {
    type: 'RECEIVE_PROJECTS_DATA',
    data: projects
  }
}


const fetchTagsSuccess = tags => {
  return {
    type: 'RECEIVE_TAGS_DATA',
    data: tags
  }
}

const fetchUsersSuccess = users => {
  return {
    type: 'RECEIVE_USERS_DATA',
    data: users
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
      accountsRef.onSnapshot((snapshot) => {
        let accounts={};
        snapshot.docs.forEach((doc) => {
          accounts[doc.id]=doc.data();
        })
        dispatch(fetchAccountsSuccess(accounts))
      })
      positionsRef.onSnapshot((snapshot) => {
        let positions={};
        snapshot.docs.forEach((doc) => {
          positions[doc.id]=doc.data();
        })
        dispatch(fetchPositionsSuccess(positions));
      })
      projectsRef.onSnapshot((snapshot) => {
        let projects={};
        snapshot.docs.forEach((doc) => {
          projects[doc.id]=doc.data();
        })
        dispatch(fetchProjectsSuccess(projects));
      })
      tagsRef.onSnapshot((snapshot) => {
        let tags={};
        snapshot.docs.forEach((doc) => {
          tags[doc.id]=doc.data();
        })
        dispatch(fetchTagsSuccess(tags));
      })
      usersRef.onSnapshot((snapshot) => {
        let users={};
        snapshot.docs.forEach((doc) => {
          users[doc.id]=doc.data();
        })
        dispatch(fetchUsersSuccess(users));
      })
      dispatch(setCurrentUser(user.uid))
    }
  })
}
