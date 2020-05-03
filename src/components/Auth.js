import React, { useState, useEffect } from 'react'
import firebase from '../utils/firebase'
import AppLoader from './AppLoader'
import GoalModal from './GoalModal'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [isGoalModalOpened, setIsGoalModalOpened] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        let userData = user
        user.getIdTokenResult(true)
          .then((idTokenResult) => {
            if (!idTokenResult.claims.isGoalSet || !idTokenResult.claims.currency) {
              setIsGoalModalOpened(true);
            }

            userData.customClaims = idTokenResult.claims
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            setCurrentUser(userData)
            setPending(false)
          })
      } else {
        setPending(false)
      }
    })
  }, [])

  if (pending) {
    return <AppLoader />
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
      <GoalModal  
        open={isGoalModalOpened}
        handleClose={() => setIsGoalModalOpened(false)}
      />
    </AuthContext.Provider>
  )
}

export default AuthProvider