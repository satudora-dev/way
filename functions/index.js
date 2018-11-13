'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')({
  keyFilename: './account.json',
});
const path = require('path');

admin.initializeApp(functions.config().firebase);

//Some functions below