import { firebaseDB, firebaseStorage } from '../firebase';

const dbRef = firebaseDB.ref();
const storageRef = firebaseStorage.ref();

export function uploadIcon(icon, userKey, dispatch) {
  if (!icon) return;

  let uploadKey = `icons/${userKey}`;
  storageRef.child(uploadKey).put(icon).on('state_changed',
    null,
    error => {
      if (error) {
        dispatch({
          type: 'UPDATE_IMAGE_ERROR',
          message: error.message,
        });
      }
    });
}

export function deleteIconRef(userKey, dispatch) {

  let key = `users/${userKey}/icon`;
  dbRef.child(key).set(null, error => {
    dispatch({
      type: 'UPDATE_IMAGE_ERROR',
      message: error,
    });
  });
}