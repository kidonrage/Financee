import React from 'react'
import {useAlert} from 'react-alert'
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

const errors = {
  common: {
    'permission-denied': 'Нет доступа',
    'invalid-argument': 'Были отправлены невалидные данные',
    'internal': 'Произошла внутренняя ошибка'
  },
  incomeSource: {
    'out-of-range': 'Нельзя создать больше 4-х доп. источников дохода'
  }
}

class Firebase {
  constructor(alert = null) {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
    this.functions = firebase.functions()
    if (alert) {
      this.alert = alert
    }
  }

  catchError = (error, errorSubject) => {
    if (!this.alert) {
      return
    }
    
    let errorMessage = ''

    if (errorSubject && errors[errorSubject] && errors[errorSubject][error.code]) {
      errorMessage = errors[errorSubject][error.code]
    } else {
      const commonErrorMessage = errors.common[error.code]
      errorMessage = commonErrorMessage ? commonErrorMessage : error.toString()
    }
    
    this.alert.error(errorMessage)
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
    const setMainSource = this.functions.httpsCallable('setGoal');
    return new Promise((resolve) => {
      setMainSource({ 
        goal: parseInt(goal, 10),
        currency
      })
      .then(resolve)
      .catch(this.catchError)
    })
    // const {uid} = this.auth.currentUser

    // const userDataRef = this.db.doc(`${uid}/userData`)
    // return userDataRef.set(
    //   { 
        
    //   },
    //   { merge: true }
    // )
    // .then(() => {
    //   alert("Всё добавлено!")
    // })
    // .catch(this.catchError)
  }

  setMainIncomeSource(name, expectedSavingPercentage, color) {
    const setMainSource = this.functions.httpsCallable('setMainSource');
    return new Promise((resolve) => {
      setMainSource({ 
        name, 
        expectedSavingPercentage: parseInt(expectedSavingPercentage, 10), 
        color, 
      })
      .then(resolve)
      .catch(this.catchError)
    })
  }

  addIncomeSource(name, expectedSavingPercentage, color) {
    const addExtraSource = this.functions.httpsCallable('addExtraSource');
    return new Promise((resolve) => {
      addExtraSource({ 
        name, 
        expectedSavingPercentage: parseInt(expectedSavingPercentage, 10), 
        color, 
      })
      .then(resolve)
      .catch(error => this.catchError(error, 'incomeSource'))
    })
  }

  getIncomeSources() {
    const {uid} = this.auth.currentUser

    return new Promise((resolve) => {
      this.db.doc(`${uid}/incomeSources`).get()
      .then(doc => {
        if (doc.exists) {
          const {sources} = doc.data()

          resolve(sources && sources.length ? sources : [])
        } else {
          resolve([])
        }
      })
      .catch(this.catchError)
    })
  }

  addIncome(amount, goalSaving, source) {
    const {uid} = this.auth.currentUser
    
    return new Promise((resolve) => {
      this.db.collection(`${uid}/incomes/items`).add({
        amount: parseInt(amount, 10),
        goalSaving: parseInt(goalSaving, 10),
        source: source
      })
      .then(resolve)
      .catch(this.catchError)
    })
  }

  getIncomesRef() {
    const {uid} = this.auth.currentUser

    return this.db.collection(`${uid}/incomes/items`)
  }

  getUserData() {
    const {uid} = this.auth.currentUser

    return new Promise((resolve) => {
      this.db.doc(`${uid}/userData`).get()
      .then(doc => {
        if (!doc.exists) {
          resolve({})
        }

        resolve(doc.data())
      })
      .catch(this.catchError)
    })
  }

  getPlanningData() {
    const {uid} = this.auth.currentUser

    return new Promise((resolve) => {
      this.db.doc(`${uid}/planningData`).get()
      .then(doc => {
        if (!doc.exists) {
          resolve(null)
        }

        resolve(doc.data())
      })
      .catch(this.catchError)
    })
  }
}

const firebaseInstance = new Firebase()

const configureFirebase = (alert) => {
  firebaseInstance.alert = alert
}

export const FirebaseProvider = ({children}) => {
  const alert = useAlert()
  configureFirebase(alert)

  return (
    <>
      {children}
    </>
  )
}

export default firebaseInstance