import { firebaseDB, firebaseStorage, firebaseAuth  } from '../firebase';
import { storage } from 'firebase';

const accountRef = firebaseDB.ref('accounts');
const positionRef = firebaseDB.ref('positions');
const projectRef = firebaseDB.ref('projects');
const tagRef = firebaseDB.ref('tags');
const userRef = firebaseDB.ref('users');

const storageRef = firebaseStorage.ref();



export const signOut = () => dispatch => {
  firebaseAuth().signOut()
    .catch(error => dispatch({
      type: 'SIGNOUT_ERROR',
      message: error.message,
    }));
}
