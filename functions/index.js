// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const scraper = require('../scraper')

admin.initializeApp();
const db = admin.firestore()

exports.chronJob = functions.pubsub
// .schedule('0 0,6,12,18 * * *').onRun(context => {
.schedule('* * * * *').onRun(async (context) => {
    // scraper()
    await scraper
    // console.log('here')
    return null
})
// cronJob()


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
