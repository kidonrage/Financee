import React, { useEffect, useState, useCallback, useContext } from 'react'
import InitialSetupModal from './InitialSetupModal'
import firebase from '../utils/firebase'
import { LoadingContext } from './Loading'

export const UserDataContext = React.createContext()

const UserDataProvider = ({children}) => {
  const [isInitialSetupNeeded, setIsInitialSetupNeeded] = useState(false)
  const [userData, setCurrentUserData] = useState(null)

  const { setLoading } = useContext(LoadingContext)

  const reload = useCallback(() => {
    setLoading(true)
    
    firebase.getUserData()
      .then(data => {
        if (!data.goal || !data.currency || !data.mainSource) {
          setIsInitialSetupNeeded(true);
        } else {
          setIsInitialSetupNeeded(false);
        }

        setCurrentUserData(data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  if (!userData) {
    return <></>
  }

  return (
    <UserDataContext.Provider
      value={{
        userData,
        reloadUserData: () => reload()
      }}
    >
      {isInitialSetupNeeded 
        ? (<InitialSetupModal open={isInitialSetupNeeded} />) 
        : (children)
      }
    </UserDataContext.Provider>
  )
}

export default UserDataProvider