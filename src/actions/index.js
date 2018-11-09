import { firebaseDB, firebaseStorage, firebaseAuth  } from '../firebase';

const accountRef = firebaseDB.ref('accounts');
const positionRef = firebaseDB.ref('positions');
const projectRef = firebaseDB.ref('projects');
const tagRef = firebaseDB.ref('tags');
const userRef = firebaseDB.ref('users');

const storageRef = firebaseStorage.ref();

const fetchAccountsSuccess = snapshot => {
  return {
    type: 'RECEIVE_ACCOUNTS_DATA',
    data: snapshot.val()
  }
}

const fetchAccountsError = error => {
  return {
    type: 'RECEIVE_ACCOUNTS_ERROR',
    message: error.message
  }
}



const fetchPositionsSuccess = snapshot => {
  return {
    type: 'RECEIVE_POSITIONS_DATA',
    data: snapshot.val()
  }
}

const fetchPositionsError = error => {
  return {
    type: 'RECEIVE_POSITIONS_ERROR',
    message: error.message
  }
}


const fetchProjectsSuccess = snapshot => {
  return {
    type: 'RECEIVE_PROJECTS_DATA',
    data: snapshot.val()
  }
}

const fetchProjectsError = error => {
  return {
    type: 'RECEIVE_PROJECTS_ERROR',
    message: error.message
  }
}



const fetchTagsSuccess = snapshot => {
  return {
    type: 'RECEIVE_TAGS_DATA',
    data: snapshot.val()
  }
}

const fetchTagsError = error => {
  return {
    type: 'RECEIVE_TAGS_ERROR',
    message: error.message
  }
}



const fetchUsersSuccess = snapshot => {
  return {
    type: 'RECEIVE_USERS_DATA',
    data: snapshot.val()
  }
}

const fetchUsersError = error => {
  return {
    type: 'RECEIVE_USERS_ERROR',
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
      console.log(user)
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
        if(snapshot.val()){
          let ownKey = Object.keys(snapshot.val())[0];
          dispatch(setCurrentUser(ownKey))
        }else{
          dispatch(setCurrentUser(user.Qb.m))
        }
      })
    }else{
      dispatch(setCurrentUser(null))
    }
  })
}


export const loginWithGithub = () => dispatch => {
  const provider=new firebaseAuth.GithubAuthProvider();
  firebaseAuth().signInWithPopup(provider).then(result=>{
    console.log(result)
    if(result.credential!=null){
      let idRef;
      accountRef.orderByChild('email').equalTo(result.user.email)//メールアドレスが既に登録されているか
        .once('value',(snapshot)=>{
          if(snapshot.val()==null){//初回ログイン時
            idRef=accountRef.push();
            idRef.set({
              email: result.user.email,
              token: result.credential.accessToken,
              registered: false,
            }).catch(error => dispatch({
              type: 'LOGIN_ERROR',
              message: error.message,
            }));
          }
        })
    }
  })
}

export const signUpAsUser = (userKey, given, family, mei, sei, icon) => dispatch => {
  if(!given){
    alert('Given name is empty.');
    return;
  }
  else if(!family){
    alert('Famili name is empty.');
    return;
  }
  else if(!sei){
    alert('姓が未入力です。');
    return;
  }
  else if(!mei){
    alert('名が未入力です。');
    return;
  }
  else if(!icon){
    alert('Icon image is empty.');
    return;
  }
  storageRef.child('icons/'+userKey).put(icon)
    .on('state_changed', () => {
      storageRef.child('icons/'+userKey).getDownloadURL().then((url)=>{
          userRef.child(userKey).update({
            given: given,
            family: family,
            mei: mei,
            sei: sei,
            icon: url,
          })
            .catch(error => dispatch({
              type: 'SIGNUP_ERROR',
              message: error.message,
            }));
      });
  });

  accountRef.child(userKey).update({'registered': true})
    .catch(error => dispatch({
      type: 'SIGNUP_ERROR',
      message: error.message,
    }));

}

export const signOut = () => dispatch => {
  firebaseAuth().signOut()
    .catch(error => dispatch({
      type: 'SIGNOUT_ERROR',
      message: error.message,
    }));
}

export const updateIcon = (icon, userKey) => dispatch => {
  if(!icon) return;
  storageRef.child('icons/'+userKey).put(icon)
    .on('state_changed', () => {
      storageRef.child('icons/'+userKey).getDownloadURL().then((url)=>{
          userRef.child(userKey).update({
            icon: url,
          })
            .catch(error => dispatch({
              type: 'UPDATE_IMAGE_ERROR',
              message: error.message,
            }));
      });
  });
}

export const editName = (names, userKey) => dispatch => {
  if(!names[0] || !names[1] || !userKey ) return;
  userRef.child(userKey).update({given:names[0],family:names[1]})
    .catch(error => dispatch({
      type: 'EDIT_NAME_ERROR',
      message: error.message,
    }));
}

export const addTag = (tagname, userKey) => dispatch => {
  if(!tagname || !userKey) return;
  userRef.child(userKey + `/tags/${tagname}`).set(true)
    .catch(error => dispatch({
      type: 'ADD_TAG_ERROR',
      message: error.message,
    }));
  tagRef.child(tagname + `/${userKey}`).set(true)
    .catch(error => dispatch({
      type: 'ADD_TAG_ERROR',
      message: error.message,
    }));
}

export const deleteTag = (tagname, userKey) => dispatch => {
  if(!tagname || !userKey) return;
  userRef.child(userKey + `/tags/${tagname}`).remove()
    .catch(error => dispatch({
      type: 'DELETE_TAG_ERROR',
      message: error.message,
    }));
  tagRef.child(tagname + `/${userKey}`).remove()
    .catch(error => dispatch({
      type: 'DELETE_TAG_ERROR',
      message: error.message,
    }));
}

export const updatePosition = (currentPosition,newPosition, userKey) => dispatch => {
  if(!newPosition || !userKey) return;

  if(currentPosition){
    positionRef.child(currentPosition+`/${userKey}`).remove()
      .catch(error => dispatch({
        type: 'UPDATE_POSITION_ERROR',
        message: error.message,
      }));
  }
  positionRef.child(newPosition+`/${userKey}`).set(true)
    .catch(error => dispatch({
      type: 'UPDATE_POSITION_ERROR',
      message: error.message,
    }));
  userRef.child(userKey).update({position: newPosition})
    .catch(error => dispatch({
      type: 'UPDATE_POSITION_ERROR',
      message: error.message,
    }));
}


export const updateProjects = (currentProjects, newProjects, userKey) => dispatch => {
  if(!userKey) return;
  if(currentProjects.length > 0){
    for(let project of currentProjects){
      userRef.child(userKey + `/projects/${project}`).remove()
        .catch(error => dispatch({
          type: 'UPDATE_PROJECTS_ERROR',
          message: error.message,
        }));
      projectRef.child(project + `/members/${userKey}`).remove()
        .catch(error => dispatch({
          type: 'UPDATE_PROJECTS_ERROR',
          message: error.message,
        }));
    }
  }

  for(let project of newProjects){
    userRef.child(userKey + `/projects/${project}`).set(true)
      .catch(error => dispatch({
        type: 'UPDATE_PROJECTS_ERROR',
        message: error.message,
      }));
    projectRef.child(project + `/members/${userKey}`).set(true)
      .catch(error => dispatch({
        type: 'UPDATE_PROJECTS_ERROR',
        message: error.message,
      }));
  }
}
