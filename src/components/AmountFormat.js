import React, { useContext, useMemo } from 'react'
import NumberFormat from 'react-number-format'
import { UserDataContext } from './UserDataProvider'

export default function AmountFormat({ name, inputRef, onChange, ...other }) {
  let {userData} = useContext(UserDataContext)

  const currencySuffix = useMemo(() => {
    if (!userData || !userData.currency) {
      return ''
    }
    
    return ` ${userData.currency.label}`
  }, [userData])

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