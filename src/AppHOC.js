import React from 'react'
import {positions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from './components/AlertTemplate'
import { FirebaseProvider } from './utils/firebase'

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 50000,
  containerStyle: {
    zIndex: 10000,
    width: 'auto',
    padding: '8px',
    left: 0,
    right: 0
  }
};

const AppHOC = ({children}) => {
  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <FirebaseProvider>
        {children}
      </FirebaseProvider>
    </AlertProvider>
  )
}

export default AppHOC