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
const testfirestore = firebaseApp.firestore();


const accountsRef=testfirestore.collection('accounts');
const positionsRef=testfirestore.collection('positions');
const projectsRef=testfirestore.collection('projects');
const tagsRef=testfirestore.collection('tags');
const usersRef=testfirestore.collection('users');


describe('firestore rules test', () => {
  jest.setTimeout(10000)

  const PermissionDenied = 'Missing or insufficient permissions.';
  const testData = {test: true};

  const allDenied = async (Ref) => {
    // Create Failure
    await expect(Ref.doc('Test').set(testData)).rejects.toThrow(PermissionDenied);
    // Read Failure
    await expect(Ref.doc('Test').get()).rejects.toThrow(PermissionDenied);
    // Update Failure
    await expect(Ref.doc('Test').update(testData)).rejects.toThrow(PermissionDenied);
    // Delete Failure
    await expect(Ref.doc('Test').delete()).rejects.toThrow(PermissionDenied);
  }

  describe('accounts collection', () =>{
    describe('When Not logged in', () =>{
      test('disallow CRUD ', async () =>{
        allDenied(accountsRef);
      });
    });

    describe('When logged in', () =>{

      beforeAll( async () => {
        await firebase.auth().signInAnonymously();
      })

      afterAll( async () => {
        await firebase.auth().currentUser.delete()
      })

      test('allow CRUD on mydoc', async () =>{
        let UID = firebase.auth().currentUser.uid;
        //Create
        await expect(accountsRef.doc(UID).set(testData)).resolves.toBeUndefined();
        //Read
        await expect(accountsRef.doc(UID).get()).resolves.toBeDefined()
        //Update
        await expect(accountsRef.doc(UID).update(testData)).resolves.toBeUndefined()
        //Delete
        await expect(accountsRef.doc(UID).delete()).resolves.toBeUndefined();
      });

      test('disallow CRUD on others', async () =>{
        allDenied(accountsRef);
      });
    })
  })
  describe('positions collection', () =>{
    describe('When Not logged in', () =>{
      test('disallow CRUD ', async () =>{
        allDenied(positionsRef);
      });
    });
    describe('When logged in', () =>{
      beforeAll( async () => {
        await firebase.auth().signInAnonymously();
      })
      afterAll( async () => {
        await firebase.auth().currentUser.delete()
      })

      test('allow RU, disallow CD', async () =>{
        //Create Failure
        await expect(positionsRef.add(testData)).rejects.toThrow(PermissionDenied);
        //Read Success
        await expect(positionsRef.doc('Test').get()).resolves.toBeDefined();
        //Update Success
        await expect(positionsRef.doc('Test').update(testData)).resolves.toBeUndefined();
        //Delete Failure
        await expect(positionsRef.doc('Test').delete()).rejects.toThrow(PermissionDenied);
      });
    })
  })
  describe('projects collection', () =>{
    describe('When Not logged in', () =>{
      test('disallow CRUD ', async () =>{
        allDenied(projectsRef);
      });
    });
    describe('When logged in', () =>{
      beforeAll( async () => {
        await firebase.auth().signInAnonymously();
      })
      afterAll( async () => {
        await firebase.auth().currentUser.delete()
      })

      test('allow RU, disallow CD ', async () =>{
        //Create Failure
        await expect(projectsRef.add(testData)).rejects.toThrow(PermissionDenied);
        //Read Success
        await expect(projectsRef.doc('Test').get()).resolves.toBeDefined();
        //Update Success
        await expect(projectsRef.doc('Test').update(testData)).resolves.toBeUndefined();
        //Delete  Failure
        await expect(projectsRef.doc('Test').delete()).rejects.toThrow(PermissionDenied);
      });
    })
  })

  describe('tags collection', () =>{
    describe('When Not logged in', () =>{
      test('disallow CRUD ', async () =>{
        allDenied(tagsRef);
      });
    });
    describe('When logged in', async () =>{
      beforeAll( async () => {
        await firebase.auth().signInAnonymously();
      })
      afterAll( async () => {
        await firebase.auth().currentUser.delete()
      })

      test('allow CRUD', async () =>{
        //Create Success
        await expect(tagsRef.doc('Test').set(testData)).resolves.toBeUndefined();
        //Read Success
        await expect(tagsRef.doc('Test').get()).resolves.toBeDefined()
        //Update Success
        await expect(tagsRef.doc('Test').update(testData)).resolves.toBeUndefined()
        //Delete Success
        await expect(tagsRef.doc('Test').delete()).resolves.toBeUndefined();
      })
    })
  })
  describe('users collection', () =>{
    describe('When Not logged in', () =>{
      test('disallow CRUD ', async () =>{
        allDenied(usersRef);
      });
    });
  describe('When logged in', () => {
    beforeAll( async () => {
      await firebase.auth().signInAnonymously();
    })
    afterAll( async () => {
      await firebase.auth().currentUser.delete();
    })

    test('allow CRUD on mydoc', async () =>{
      let UID = firebase.auth().currentUser.uid;
      //Create Success
      await expect(usersRef.doc(UID).set(testData)).resolves.toBeUndefined();
      //Read Success
      await expect(usersRef.doc(UID).get()).resolves.toBeDefined();
      //Update Success
      await expect(usersRef.doc(UID).update(testData)).resolves.toBeUndefined();
      //Delete Success
      await expect(usersRef.doc(UID).delete()).resolves.toBeUndefined();
    });
    test('disallow CD, allow RU on others', async () =>{
      // Create Failure
      await expect(usersRef.add(testData)).rejects.toThrow(PermissionDenied);
      // Read Success
      await expect(usersRef.doc('Test').get()).resolves.toBeDefined();
      // Update Success
      await expect(usersRef.doc('Test').update(testData)).resolves.toBeUndefined();
      // Delete Failure
      await expect(usersRef.doc('Test').delete()).rejects.toThrow(PermissionDenied);
    });
  })
})
})
