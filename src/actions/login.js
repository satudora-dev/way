import { fireStore, firebaseAuth } from '../firebase';

const accountsRef=fireStore.collection('accounts');



export const loginWithGithub = () => dispatch => {
  const provider=new firebaseAuth.GithubAuthProvider();
  firebaseAuth().signInWithPopup(provider).then(result=>{
    if(result.credential!=null){
      accountsRef.doc(result.user.uid).set({
        email: result.user.email,
        token: result.credential.accessToken,
      }).catch(error => dispatch({
              type: 'LOGIN_ERROR',
              message: error.message,
            }));
    }
  })
}
