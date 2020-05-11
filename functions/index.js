const functions = require('firebase-functions')
const admin = require('firebase-admin')
const firebaseHelper = require('firebase-functions-helper')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const moment = require('moment')

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

exports.onIncomeCreates = functions.firestore.document('{userId}/incomes/items/{itemId}')
  .onWrite((change, context) => {
    const incomeData = change.after.data()
    if (incomeData && incomeData.goalSaving) {
      store.doc(context.params.userId + '/userData').update({
        goalProgress: admin.firestore.FieldValue.increment(incomeData.goalSaving)
      })
    } else {
      if (change.after.exists) {
        change.after.ref.delete()
      }
      return null
    }
  })

// exports.addUserIncome = functions.https.onCall((data, context) => {
//   const { amount, goalSaving, source } = data

//   if (typeof amount !== 'number' || typeof goalSaving !== 'number' || !source) {
//     throw new functions.https.HttpsError('invalid-argument', 'Отправлены невалидные данные.');
//   }

//   if (amount < goalSaving) {
//     throw new functions.https.HttpsError('invalid-argument', 'Размер дохода не может быть меньше инвестиции в цель');
//   }

//   const uid = context.auth.uid;

// })

exports.setGoal = functions.https.onCall(async (data, context) => {
  const {goal, currency} = data;

  if (typeof goal !== 'number' || !goal || !currency || typeof currency.label !== 'string' || currency.label.length !== 1 || typeof currency.value !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Не те аргументы.');
  }

  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.');
  }

  const uid = context.auth.uid;

  const months = [];

  let tempMonth = moment().utc();
  for (let index = 0; index < 12; index++) {
    const monthObject = {}
    monthObject.startDate = tempMonth.format()

    tempMonth = tempMonth.add(1, 'month');

    monthObject.endDate = tempMonth.format()

    months.push(monthObject)
  }

  try {
    await store.doc(uid + '/userData').set({ 
      goal,
      currency,
      goalEndDate: tempMonth.format(),
      nextPlanning: months[0].startDate
    }, { merge: true })

    await store.doc(uid + '/planningData').set({ 
      monthsData: months
    })

    return null
  } catch (error) {
    throw new functions.https.HttpsError(error.code, error.message)
  }
});

exports.setMainSource = functions.https.onCall((data, context) => {
  const {name, expectedSavingPercentage, color} = data;

  if (typeof name !== 'string' || !name.length || typeof expectedSavingPercentage !== 'number' || typeof color !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Не те аргументы.');
  }

  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.');
  }

  const uid = context.auth.uid;

  return store.doc(uid + '/userData').set(
    {
      mainSource: {
        name, 
        expectedSavingPercentage,
        color,
        id: 'main'
      }
    },
    { merge: true }
  )
});

exports.addExtraSource = functions.https.onCall(async (data, context) => {
  const {name, expectedSavingPercentage, color} = data;

  if (typeof name !== 'string' || !name.length || typeof expectedSavingPercentage !== 'number' || typeof color !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Не те аргументы.');
  }

  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.');
  }

  const uid = context.auth.uid;

  const userDataRef = store.doc(uid + '/userData')

  try {
    const userData = await (await userDataRef.get()).data()

    const {extraSources} = userData
      
      if (extraSources && extraSources.length >= 4) {
        throw new functions.https.HttpsError('out-of-range', 'Нельзя создать так много источников дохода');
      }

      const newExtraSource = {
        name,
        color,
        expectedSavingPercentage: parseInt(expectedSavingPercentage, 10),
        id: `extra${extraSources ? extraSources.length : 0}`
      }

      const newExtraSources = extraSources 
        ? admin.firestore.FieldValue.arrayUnion(newExtraSource)
        : [newExtraSource]

      return userDataRef.set({
        extraSources: newExtraSources
      }, {merge: true})
      .then(() => {return newExtraSource})
  } catch (error) {
    throw new functions.https.HttpsError(error.code, error.message)
  }
});

exports.initUserData = functions.auth.user().onCreate((user) => {
  const uid = user.uid

  store.doc(uid + '/userData').set({
    goalProgress: 0,
    totalIncome: 0,
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
