import firebase from '../../utils/firebase'

export function getIncomes(pageSize) {
  return new Promise((resolve, reject) => {
    firebase.getIncomesRef().orderBy('amount').limit(pageSize).get()
      .then((querySnapshot) => {
        const lastDocument = querySnapshot.docs.length ? querySnapshot.docs[querySnapshot.docs.length - 1] : null
        const incomes = querySnapshot.docs.map(income => income.data())

        resolve({incomes, lastDocument})
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function getNextIncomes(pageSize, lastField) {
  return new Promise((resolve, reject) => {
    firebase.getIncomesRef().orderBy('amount').startAfter(lastField).limit(pageSize).get()
      .then(querySnapshot => {
        const lastDocument = querySnapshot.length ? querySnapshot.docs[querySnapshot.docs.length - 1] : null
        const incomes = querySnapshot.docs.map(income => income.data())
  
        resolve({incomes, lastDocument})
      })
      .catch(e => {
        reject(e)
      })
  })
}