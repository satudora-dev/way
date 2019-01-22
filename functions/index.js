'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const fs = require('fs');

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
const APP_NAME = 'WhoAreYou';


exports.newUserEmailNotification = functions.firestore.document('users/{UID}').onCreate((snap, context) => {
  const newUserData = snap.data();
  const newUserID = context.params.UID;
  const newUserFullName = newUserData.given_en;

  return firestore.collection('accounts').get().then(snapshot => {
    snapshot.forEach(doc => {
      if(doc.id !== newUserID){
        return sendNewComerEmail(doc.data().email, newUserFullName, newUserID);
      }
    });
  })
})


function sendNewComerEmail(email, newUserFullName, newUserID) {
  const senderEmail = "whowareayouy@gmail.com"
  const mailOptions = {
    from: `${APP_NAME} <${senderEmail}>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `${newUserFullName} joined us!`;
  mailOptions.html = `
    <h2>
      ${newUserFullName} joined us!
    </h2>
    <p> Let's add tag to ${newUserFullName}!</p>
    <a href="https://way.satudora.co/users/${newUserID}">
      <img src="https://firebasestorage.googleapis.com/v0/b/whoareyou-c231f.appspot.com/o/way.png?alt=media&token=7e598f08-0e20-4661-b0f8-83f825a29693" />
    </a>`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('New comer email sent to:', email);
  }).catch(error => {
    console.log(error.message);
  });
}

exports.storeGithubReport = functions.https.onRequest((req, res) => {
    let data = JSON.parse(fs.readFileSync('./apiData.json', 'utf8'));
    return require('./api_data2firestore').storeData(firestore, data);
});