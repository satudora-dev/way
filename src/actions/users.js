import { fireStore, firebaseAuth} from '../firebase';


const usersRef=fireStore.collection('users');
// const accountsRef=fireStore.collection('accounts');
// const positionsRef=fireStore.collection('positions');
// const projectsRef=fireStore.collection('projects');
// const tagsRef=fireStore.collection('tags');

const fetchUsersSuccess = users => {
  return {
    type: 'RECEIVE_USERS_DATA',
    data: users
  }
}

export const fetchUsers = () => dispatch => {
  usersRef.onSnapshot((snapshot) => {
    let users={};
    snapshot.docs.forEach((doc) => {
      users[doc.id]=doc.data();
    })
    dispatch(fetchUsersSuccess(users));
  })
}
