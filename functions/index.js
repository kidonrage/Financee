const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const store = admin.firestore();

// exports.documentWriteListener = functions.firestore.document('incomes/{documentUid}/items/{itemId}')
//   .onWrite((change, context) => {

//     if (!change.before.exists) {
//       return change.after.ref.set({
//         count: FieldValue.increment(1)
//       }, {merge: true});
//     } else if (change.before.exists && change.after.exists) {
//       //
//     } else if (!change.after.exists) {
//       return change.after.ref.set({
//         count: FieldValue.increment(-1)
//       }, {merge: true});
//     }

//     return;
// });

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

