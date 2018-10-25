import { firebaseDB, firebaseStorage, firebaseAuth  } from '../firebase';

const Accountref = firebaseDB.ref('accounts');
const Positionref = firebaseDB.ref('positions');
const Projectref = firebaseDB.ref('projects');
const Tagref = firebaseDB.ref('tags');
const Userref = firebaseDB.ref('users');

const Storageref=firebaseStorage.ref();

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

const setCurrentUser = ownkey  => {
  return {
    type: 'SET_CURRENT_USER',
    ownkey: ownkey
  }
}



//
// export const fetchAccounts = () => dispatch => {
//   Accountref.off()
//   Accountref.on('value',
//     (snapshot) => {dispatch(fetchAccountsSuccess(snapshot))},
//     (error) => {dispatch(fetchAccountsError(error))}
//   )
// }
//
// export const fetchPositions = () => dispatch => {
//   Positionref.off()
//   Positionref.on('value',
//     (snapshot) => {dispatch(fetchPositionsSuccess(snapshot))},
//     (error) => {dispatch(fetchPositionsError(error))}
//   )
// }
//
// export const fetchProjects = () => dispatch => {
//   Projectref.off()
//   Projectref.on('value',
//     (snapshot) => {dispatch(fetchProjectsSuccess(snapshot))},
//     (error) => {dispatch(fetchProjectsError(error))}
//   )
// }
// export const fetchTags = () => dispatch => {
//   Tagref.off()
//   Tagref.on('value',
//     (snapshot) => {dispatch(fetchTagsSuccess(snapshot))},
//     (error) => {dispatch(fetchTagsError(error))}
//   )
// }
// export const fetchUsers = () => dispatch => {
//   Userref.off()
//   Userref.on('value',
//     (snapshot) => {dispatch(fetchUsersSuccess(snapshot))},
//     (error) => {dispatch(fetchUsersError(error))}
//   )
// }
//
//
//
// export const loginAsUser = email => dispatch => {
//   Accountref.orderByChild('email').equalTo(email).once('value', (snapshot) =>{
//     let ownkey = Object.keys(snapshot.val())[0];
//     dispatch(setCurrentUser(ownkey))
//   })
// }



export const initFetchIfLoggedIn = () => dispatch => {
  firebaseAuth().onAuthStateChanged(user=>{
    if(user){
      // fetchAccounts();
      Accountref.off()
      Accountref.on('value',
        (snapshot) => {dispatch(fetchAccountsSuccess(snapshot))},
        (error) => {dispatch(fetchAccountsError(error))}
      )
      // fetchPositions();
      Positionref.off()
      Positionref.on('value',
        (snapshot) => {dispatch(fetchPositionsSuccess(snapshot))},
        (error) => {dispatch(fetchPositionsError(error))}
      )
      // fetchProjects();
      Projectref.off()
      Projectref.on('value',
        (snapshot) => {dispatch(fetchProjectsSuccess(snapshot))},
        (error) => {dispatch(fetchProjectsError(error))}
      )
      // fetchTags();
      Tagref.off()
      Tagref.on('value',
        (snapshot) => {dispatch(fetchTagsSuccess(snapshot))},
        (error) => {dispatch(fetchTagsError(error))}
      )
      // fetchUsers();
      Userref.off()
      Userref.on('value',
        (snapshot) => {dispatch(fetchUsersSuccess(snapshot))},
        (error) => {dispatch(fetchUsersError(error))}
      )
      // loginAsUser(user.email);
      Accountref.orderByChild('email').equalTo(user.email).once('value', (snapshot) =>{
        let ownkey = Object.keys(snapshot.val())[0];
        dispatch(setCurrentUser(ownkey))
      })
    }else{
      // loginAsUser(null);
      dispatch(setCurrentUser(null))
    }
  })
}







export const loginWithGithub = () => dispatch => {
  const provider=new firebaseAuth.GithubAuthProvider();
  firebaseAuth().signInWithPopup(provider).then(result=>{
    if(result.credential!=null){
      let idRef;
      Accountref.orderByChild('email').equalTo(result.user.email)//メールアドレスが既に登録されているか
        .once('value',(snapshot)=>{
          if(snapshot.val()==null){//初回ログイン時
            idRef=Accountref.push();
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





export const signupAsUser = (userkey, given, family, mei, sei, icon) => dispatch => {
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
  Storageref.child('icons/'+userkey).put(icon)
    .on('state_changed', () => {
      Storageref.child('icons/'+userkey).getDownloadURL().then((url)=>{
          Userref.child(userkey).update({
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

  Accountref.child(userkey).update({'registered': true})
    .catch(error => dispatch({
      type: 'SIGNUP_ERROR',
      message: error.message,
    }));

}

export const editName = (names, userkey) => dispatch => {
  if(names[0] === "" || names[1] === "" || names[0] === undefined || names[1] === undefined || !userkey ) return;
  Userref.child(userkey).update({given:names[0],family:names[1]})
    .catch(error => dispatch({
      type: 'EDIT_NAME_ERROR',
      message: error.message,
    }));
}

export const addTag = (tagname, userkey) => dispatch => {
  if(tagname === "" || tagname === undefined || !userkey) return;
  Userref.child(userkey + `/tags/${tagname}`).set(true)
    .catch(error => dispatch({
      type: 'TAG_ADD_ERROR',
      message: error.message,
    }));
  Tagref.child(tagname + `/${userkey}`).set(true)
    .catch(error => dispatch({
      type: 'TAG_ADD_ERROR',
      message: error.message,
    }));
}

export const deleteTag = (tagname, userkey) => dispatch => {
  if(tagname === "" || tagname === undefined || !userkey) return;
  Userref.child(userkey + `/tags/${tagname}`).remove()
    .catch(error => dispatch({
      type: 'TAG_DELETE_ERROR',
      message: error.message,
    }));
  Tagref.child(tagname + `/${userkey}`).remove()
    .catch(error => dispatch({
      type: 'TAG_DELETE_ERROR',
      message: error.message,
    }));
}

export const addPosition = (position, userkey) => dispatch => {
  if(position === "" || position === undefined || !userkey) return;
  Userref.child(userkey + "/position").set(position)
    .catch(error => dispatch({
      type: 'ADD_POSITION_ERROR',
      message: error.message,
    }));
  Positionref.child(position+`/${userkey}`).set(true)
    .catch(error => dispatch({
      type: 'ADD_POSITION_ERROR',
      message: error.message,
    }));
}


export const setProjects = (projects, userkey) => dispatch => {
  if(projects === "" || projects === undefined || !userkey) return;
  for(let project of projects){
    Userref.child(userkey + `/projects/${project}`).set(true)
      .catch(error => dispatch({
        type: 'SET_PROJECTS_ERROR',
        message: error.message,
      }));
    Projectref.child(project + `/members/${userkey}`).set(true)
      .catch(error => dispatch({
        type: 'SET_PROJECTS_ERROR',
        message: error.message,
      }));
  }
}
