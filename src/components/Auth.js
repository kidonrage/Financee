import React, { useState, useEffect } from 'react'
import firebase from '../utils/firebase'
import AppLoader from './AppLoader'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [userAuthData, setUserAuthData] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    // App Init Login
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAuthData(user)
      }

      setPending(false)
    })
  }, [])

  if (pending) {
    return <AppLoader />
  }

  return (
    <AuthContext.Provider
      value={{
        authData: userAuthData
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider