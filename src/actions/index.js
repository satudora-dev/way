import { firebaseDB, firebaseStorage, firebaseAuth  } from '../firebase';
import { storage } from 'firebase';

const accountRef = firebaseDB.ref('accounts');
const positionRef = firebaseDB.ref('positions');
const projectRef = firebaseDB.ref('projects');
const tagRef = firebaseDB.ref('tags');
const userRef = firebaseDB.ref('users');

const storageRef = firebaseStorage.ref();


export const loginWithGithub = () => dispatch => {
  const provider=new firebaseAuth.GithubAuthProvider();
  firebaseAuth().signInWithPopup(provider).then(result=>{
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
