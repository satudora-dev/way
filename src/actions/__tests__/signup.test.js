import firebase from 'firebase';
import "firebase/storage";

jest.mock('../../firebase', () => {
  const firebase = require('firebase');
  const testFirebaseConfig = {
    apiKey: "AIzaSyCBXWCzAv-oAT-HlUgNdHHIgh7fl2O5uDE",
    authDomain: "whoareyou-dev.firebaseapp.com",
    databaseURL: "https://whoareyou-dev.firebaseio.com",
    projectId: "whoareyou-dev",
    storageBucket: "whoareyou-dev.appspot.com",
    messagingSenderId: "944348152216"
  }
  const firebaseApp = firebase.initializeApp(testFirebaseConfig);
  const testfirebaseauth = firebase.auth;
  const testfirebasestorage = firebase.storage();
  const testfirestore = firebaseApp.firestore();
  const settings = {timestampsInSnapshots: true};
  testfirestore.settings(settings);
  return {
    firebaseAuth: testfirebaseauth,
    firebaseStorage: testfirebasestorage,
    fireStore: testfirestore,
  };
});



import * as signupActions from'../signup';
const dispatch = jest.fn()

describe('profile actions test', () => {
  jest.setTimeout(10000)
  beforeAll( async () => {
    await firebase.auth().signInAnonymously();
  })
  afterAll( async () => {
    await firebase.auth().currentUser.delete()
  })
  test('editName test', async () => {
    const byteSize = Math.pow(10, 6);
    const s = ('0').repeat(byteSize);
    const myBlob = Blob.valueOf(s);
    await signupActions.signUpAsUser(
      'O9Rbi56LGVcNQD4xWUOL2TLgxPr1',
      'asano',
      'kouuuhei',
      'あさの',
      'こうへい',
      new myBlob
    )(dispatch)
  })
})
