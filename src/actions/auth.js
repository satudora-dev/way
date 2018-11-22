import { firebaseAuth } from '../firebase';

const setCurrentUser = currentUserID  => {
  return {
    type: 'SET_CURRENT_USER',
    currentUserID: currentUserID
  }
}

export const checkUserAuth = () => dispatch => {
  firebaseAuth().onAuthStateChanged(user=>{
    if(user){
      dispatch(setCurrentUser(user.uid));
    }else{
      dispatch(setCurrentUser(null));
    }
  })
}
