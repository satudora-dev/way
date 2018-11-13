import { firebaseDB, firebaseStorage } from '../firebase';

const dbRef = firebaseDB.ref();
const storageRef = firebaseStorage.ref();

export const uploadIcon = (icon, userKey) => dispatch => {
  if (!icon) return;

  let uploadKey = `icons/${userKey}`;
  storageRef.child(uploadKey).put(icon).on('state_changed', null,
    error => {
      if (error) {
        dispatch({
          type: 'UPDATE_IMAGE_ERROR',
          message: error.message,
        });
      }
    },
    () => {
      storageRef.child(uploadKey).getDownloadURL().then(url => {
        let userRef = `users/${userKey}`;
        dbRef.child(userRef).update({
          icon: url,
        }).catch(error => {
          if (error) {
            dispatch({
              type: 'UPDATE_IMAGE_ERROR',
              message: error.message,
            });
          }
        });
      });
    });
};