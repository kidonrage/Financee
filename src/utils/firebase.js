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

  addIncomeSource(name, color) {
    const {uid} = this.auth.currentUser
    
    const userIncomeSourcesRef = this.db.collection(`incomeSources`).doc(uid)
    return userIncomeSourcesRef.set({
      sources: firebase.firestore.FieldValue.arrayUnion({
        name,
        color
      })
    }, {merge: true})
  }

  getIncomeSources() {
    const {uid} = this.auth.currentUser

    return this.db.collection(`incomeSources`).doc(uid).get()
      .then(doc => {
        if (doc.exists) {
          const {sources} = doc.data()
          
          return sources && sources.length ? sources : []
        } else {
          return []
        }
      })
  }

  addIncome(amount, source) {
    const {uid} = this.auth.currentUser
    
    return this.db.collection(`incomes/${uid}/items`).add({
      amount: parseInt(amount, 10),
      source: source
    })
    .catch(error => {
      alert("Не удалось добавить доход")
    })
  }

  getIncomesRef() {
    const {uid} = this.auth.currentUser

    return this.db.collection(`incomes/${uid}/items`)
  }
}

export default new Firebase()