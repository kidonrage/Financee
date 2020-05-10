import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
    this.functions = firebase.functions()
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  setUserGoal(goal, currency) {
    const {uid} = this.auth.currentUser

    const userDataRef = this.db.doc(`${uid}/userData`)
    return userDataRef.set(
      { 
        goal: parseInt(goal, 10),
        currency
      },
      { merge: true }
    )
    .then(() => {
      alert("Всё добавлено!")
    })
    .catch(error => {
      if (error.code === 'permission-denied') {
        alert("Permission denied!")
        return
      }

      console.error("Error!", JSON.stringify(error))
    })
  }

  setMainIncomeSource(name, expectedSavingPercentage, color) {
    const setMainSource = this.functions.httpsCallable('setMainSource');
    return setMainSource({ 
      name, 
      expectedSavingPercentage: parseInt(expectedSavingPercentage, 10), 
      color, 
    })
    .catch(e => console.error(JSON.stringify(e)))
  }

  addIncomeSource(name, expectedSavingPercentage, color) {
    const addExtraSource = this.functions.httpsCallable('addExtraSource');
    return addExtraSource({ 
      name, 
      expectedSavingPercentage: parseInt(expectedSavingPercentage, 10), 
      color, 
    })
    .catch(e => console.error(JSON.stringify(e)))
  }

  getIncomeSources() {
    const {uid} = this.auth.currentUser

    return this.db.doc(`${uid}/incomeSources`).get()
      .then(doc => {
        if (doc.exists) {
          const {sources} = doc.data()

          return sources && sources.length ? sources : []
        } else {
          return []
        }
      })
  }

  addIncome(amount, goalSaving, source) {
    const {uid} = this.auth.currentUser
    
    return this.db.collection(`${uid}/incomes/items`).add({
      amount: parseInt(amount, 10),
      goalSaving: parseInt(goalSaving, 10),
      source: source
    })
    .catch(error => {
      alert("Не удалось добавить доход")
    })
  }

  getIncomesRef() {
    const {uid} = this.auth.currentUser

    return this.db.collection(`${uid}/incomes/items`)
  }

  getUserData() {
    const {uid} = this.auth.currentUser

    return this.db.doc(`${uid}/userData`).get()
      .then(doc => {
        if (!doc.exists) {
          return {}
        }

        return doc.data()
      })
  }
}

export default new Firebase()