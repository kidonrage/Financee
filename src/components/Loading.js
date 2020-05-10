import React, { useState } from 'react'

export const LoadingContext = React.createContext()

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(null)

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading: (isLoading) => setLoading(isLoading)
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider