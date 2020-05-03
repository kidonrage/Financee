import React, { useContext, useMemo } from 'react'
import NumberFormat from 'react-number-format'
import { AuthContext } from './Auth'

export default function AmountFormat({ name, inputRef, onChange, ...other }) {
  let {currentUser} = useContext(AuthContext)

  const currencySuffix = useMemo(() => {
    if (!currentUser.customClaims || !currentUser.customClaims.currency) {
      return ''
    }
    
    return ` ${currentUser.customClaims.currency}`
  }, [currentUser])

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
            name,
          },
        })
      }}
      thousandSeparator=" "
      isNumericString
      suffix={currencySuffix}
    />
  )
}