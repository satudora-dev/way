import { fireStore, firebaseAuth} from '../firebase';


const userRef=fireStore.collection('users');
const accountRef=fireStore.collection('accounts');
const positionRef=fireStore.collection('positions');
const projectRef=fireStore.collection('projects');
const tagRef=fireStore.collection('tags');


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


const setCurrentUser = ownkey  => {
  return {
    type: 'SET_CURRENT_USER',
    ownkey: ownkey
  }
}

export const initFetchIfLoggedIn = () => dispatch => {
  firebaseAuth().onAuthStateChanged(user=>{
    if(user){
      accountRef.onSnapshot((snapshot) => {
        let accounts=[];
        snapshot.docs.forEach((doc) => {
          accounts.push(doc.data());
        })
        dispatch(fetchAccountsSuccess(accounts))
      })
      positionRef.onSnapshot((snapshot) => {
        let positions=[];
        snapshot.docs.forEach((doc) => {
          positions.push(doc.data());
        })
        dispatch(fetchPositionsSuccess(positions));
      })
      projectRef.onSnapshot((snapshot) => {
        let projects=[];
        snapshot.docs.forEach((doc) => {
          projects.push(doc.data());
        })
        dispatch(fetchProjectsSuccess(projects));
      })
      tagRef.onSnapshot((snapshot) => {
        let tags=[];
        snapshot.docs.forEach((doc) => {
          tags.push(doc.data());
        })
        dispatch(fetchTagsSuccess(tags));
      })
      userRef.onSnapshot((snapshot) => {
        let users=[];
        snapshot.docs.forEach((doc) => {
          users.push(doc.data());
        })
        dispatch(fetchUsersSuccess(users));
      })
      dispatch(setCurrentUser(user.uid))
    }else{
      dispatch(setCurrentUser(null))
    }
  })
}
