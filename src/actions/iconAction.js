import { fireStore, firebaseStorage } from '../firebase';

const usersRef=fireStore.collection('users');
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
        usersRef.doc(userKey).update({
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
