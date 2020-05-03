const functions = require('firebase-functions')
const admin = require('firebase-admin')
const firebaseHelper = require('firebase-functions-helper')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

admin.initializeApp();

const store = admin.firestore();

// ================ API ================

// const app = express();
// const main = express();

// app.post('/setUserCurrency', async (req, res) => {
//   if (!req.body.currency) {
//     res.status(400)
//     return null
//   }
  
//   const idToken = req.body.idToken;
//   admin.auth().verifyIdToken(idToken)
//     .then((verifiedToken) => {
//       return admin.auth().setCustomUserClaims(verifiedToken.uid, {
//         currency: req.body.currency
//       })
//     })
//     .then(() => {
//       res.status(200)
//       return
//     })
//     .catch(() => res.status(400))
// });

// main.use('/api/v1', app);
// main.use(bodyParser.json());
// main.use(bodyParser.urlencoded({ extended: false }));

// exports.webApi = functions.https.onRequest(main);

// ================ FUNCTIONS ================

exports.onIncomeCreates = functions.firestore.document('incomes/{userId}/items/{itemId}')
  .onWrite((change, context) => {
    const incomeData = change.after.data()
    if (incomeData && incomeData.goalSaving) {
      store.doc('users/' + context.params.userId).update({
        goalProgress: admin.firestore.FieldValue.increment(incomeData.goalSaving)
      })
    } else {
      if (change.after.exists) {
        change.after.ref.delete()
      }
      return null
    }
  })

exports.setUserCurrency = functions.https.onCall((data, context) => {
  const currency = data.currency;

  if (!currency || currency.length !== 1) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'one arguments "text" containing the message text to add.');
  }

  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.');
  }

  const uid = context.auth.uid;

  admin.auth().setCustomUserClaims(uid, {
    isGoalSet: true,
    currency
  })
});
  

// exports.onUserDataChange = functions.firestore.document('users/{userId}')
//   .onWrite((change, context) => {
//     const incomeData = change.after.data()
//     if (!incomeData) {
//       return null
//     }

//     const uid = context.params.userId

//     if (incomeData.currency) {
//       admin.auth().setCustomUserClaims(uid, {
//         currency: incomeData.currency.label,
//         isGoalSet: true
//       })
//       .catch(error => {
//         return null
//       });
//     }

//     return null
//   })
