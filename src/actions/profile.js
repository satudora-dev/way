import { fireStore} from '../firebase';
import firebase from 'firebase';

const usersRef=fireStore.collection('users');
const accountsRef=fireStore.collection('accounts');
const positionsRef=fireStore.collection('positions');
const projectsRef=fireStore.collection('projects');
const tagsRef=fireStore.collection('tags');

export const editName = (names, userKey) => dispatch => {
  if(!names[0] || !names[1] || !userKey ) return;
  usersRef.doc(userKey).update({given_en:names[0],family_en:names[1]})
    .catch(error => dispatch({
      type: 'EDIT_NAME_ERROR',
      message: error.message,
    }));
}

export const addTag = (tagname, userKey) => dispatch => {
  if(!tagname || !userKey) return;
  usersRef.doc(userKey).update({tags: firebase.firestore.FieldValue.arrayUnion(tagname)})
    .catch(error => dispatch({
      type: 'ADD_TAG_ERROR',
      message: error.message,
    }));
}

export const deleteTag = (tagname, userKey) => dispatch => {
  if(!tagname || !userKey) return;
  usersRef.doc(userKey).update({tags:firebase.firestore.FieldValue.arrayRemove(tagname)})
    .catch(error => dispatch({
      type: 'DELETE_TAG_ERROR',
      message: error.message,
    }));
}

export const updatePosition = (currentPosition,newPosition, userKey) => dispatch => {
  if(!newPosition || !userKey) return;
  usersRef.doc(userKey).update({position: newPosition})
    .catch(error => dispatch({
      type: 'UPDATE_POSITION_ERROR',
      message: error.message,
    }));
}


export const updateProjects = (currentProjects, newProjects, userKey) => dispatch => {
  if(!userKey) return;
  usersRef.doc(userKey).update({projects:newProjects})
  .catch(error => dispatch({
    type: 'UPDATE_PROJECTS_ERROR',
    message: error.message,
  }));
}
