'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

exports.testCollectionSync = functions.firestore.document('users/{UID}').onWrite((change, context) => {
  const afterData = change.after.data();
  const beforeData = change.before.data();
  if(beforeData.position !== afterData.position){
    if(beforeData.position){
      firestore.collection('positions').where("name", "==", beforeData.position).get().then( (querySnapshot) => {
        querySnapshot.forEach((positionDoc) => {
          firestore.collection('positions').doc(positionDoc.id).update({name:beforeData.position, members: FieldValue.arrayRemove(context.params.UID)});
        })
      })
    }
    if(afterData.position){
      firestore.collection('positions').where("name", "==", afterData.position).get().then( (querySnapshot) => {
        querySnapshot.forEach((positionDoc) => {
          firestore.collection('positions').doc(positionDoc.id).update({name:afterData.position, members: FieldValue.arrayUnion(context.params.UID)});
        })
      })
    }
  }


  if(beforeData.projects !== afterData.projects){
    if(beforeData.projects){
      for(let project of beforeData.projects){
        firestore.collection('projects').where("name", "==", project).get().then((querySnapshot) => {
          querySnapshot.forEach((projectDoc) => {
            firestore.collection('projects').doc(projectDoc.id).update({members: FieldValue.arrayRemove(context.params.UID)})
          })
        })
      }
    }
    if(afterData.projects){
      for(let project of afterData.projects){
        firestore.collection('projects').where("name", "==", project).get().then((querySnapshot) => {
          querySnapshot.forEach((projectDoc) => {
            firestore.collection('projects').doc(projectDoc.id).update({members: FieldValue.arrayUnion(context.params.UID)})
          })
        })
      }
    }
  }

  if(beforeData.tags !== afterData.tags){
    if(beforeData.tags){
      for(let tag of beforeData.tags){
        firestore.collection('tags').where("name", "==", tag).get().then( (querySnapshot) => {
          querySnapshot.forEach((tagDoc) => {
            if(tagDoc.data().members.length === 1) {
              firestore.collection('tags').doc(tagDoc.id).delete();
            }
            firestore.collection('tags').doc(tagDoc.id).update({name: tag, members: FieldValue.arrayRemove(context.params.UID)});
          })
        })
      }
    }
    if(afterData.tags){
      for(let tag of afterData.tags){
        firestore.collection('tags').where("name", "==", tag).get().then( (querySnapshot) => {
          if (querySnapshot.size === 0){
            firestore.collection('tags').add({name:tag, members: FieldValue.arrayUnion(context.params.UID)})
          }else{
            querySnapshot.forEach((tagDoc) => {
              firestore.collection('tags').doc(tagDoc.id).update({name:tag, members: FieldValue.arrayUnion(context.params.UID)})
            })
          }
        })
      }
    }
  }
})
