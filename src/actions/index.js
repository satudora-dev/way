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

export const fetchAccounts = () => dispatch => {
  Accountref.off()
  Accountref.on('value',
    (snapshot) => {dispatch(fetchAccountsSuccess(snapshot))},
    (error) => {dispatch(fetchAccountsError(error))}
  )
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

export const fetchPositions = () => dispatch => {
  Positionref.off()
  Positionref.on('value',
    (snapshot) => {dispatch(fetchPositionsSuccess(snapshot))},
    (error) => {dispatch(fetchPositionsError(error))}
  )
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

export const fetchProjects = () => dispatch => {
  Projectref.off()
  Projectref.on('value',
    (snapshot) => {dispatch(fetchProjectsSuccess(snapshot))},
    (error) => {dispatch(fetchProjectsError(error))}
  )
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

export const fetchTags = () => dispatch => {
  Tagref.off()
  Tagref.on('value',
    (snapshot) => {dispatch(fetchTagsSuccess(snapshot))},
    (error) => {dispatch(fetchTagsError(error))}
  )
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

export const fetchUsers = () => dispatch => {
  Userref.off()
  Userref.on('value',
    (snapshot) => {dispatch(fetchUsersSuccess(snapshot))},
    (error) => {dispatch(fetchUsersError(error))}
  )
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


const setCurrentUser = userkey  => {
  return {
    type: 'SET_CURRENT_USER',
    userkey: userkey
  }
}

export const loginAsUser = email => dispatch => {
  Accountref.orderByChild('email').equalTo(email).once('value', (snapshot) =>{
    let userkey = Object.keys(snapshot.val())[0];
    dispatch(setCurrentUser(userkey))
  })
}



export const signupAsUser = (userid, given, family, mei, sei, icon) => dispatch => {
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
  Storageref.child('icons/'+userid).put(icon)
    .on('state_changed', () => {
      Storageref.child('icons/'+userid).getDownloadURL().then((url)=>{
          Userref.child(userid).update({
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

  Accountref.child(userid).update({'registered': true})
    .catch(error => dispatch({
      type: 'SIGNUP_ERROR',
      message: error.message,
    }));

}

export const editName = (names, userid) => dispatch => {
  if(names[0] === "" || names[1] === "" || names[0] === undefined || names[1] === undefined || !userid ) return;
  Userref.child(userid).update({given:names[0],family:names[1]})
    .catch(error => dispatch({
      type: 'EDIT_NAME_ERROR',
      message: error.message,
    }));
}

export const addTag = (tagname, userid) => dispatch => {
  if(tagname === "" || tagname === undefined || !userid) return;
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
  if(tagname === "" || tagname === undefined || !userid) return;
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
  if(position === "" || position === undefined || !userid) return;
  Userref.child(userid + "/position").set(position)
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
  if(projects === "" || projects === undefined || !userid) return;
  for(let project of projects){
    Userref.child(userid + `/projects/${project}`).set(true)
      .catch(error => dispatch({
        type: 'SET_PROJECTS_ERROR',
        message: error.message,
      }));
    Projectref.child(project + `/members/${userid}`).set(true)
      .catch(error => dispatch({
        type: 'SET_PROJECTS_ERROR',
        message: error.message,
      }));
  }
}
