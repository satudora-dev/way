import { firebaseDB, firebaseStorage, firebaseAuth  } from '../firebase';
import { storage } from 'firebase';




export const signOut = () => dispatch => {
  firebaseAuth().signOut()
    .catch(error => dispatch({
      type: 'SIGNOUT_ERROR',
      message: error.message,
    }));
}
