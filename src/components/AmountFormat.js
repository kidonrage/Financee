import React from 'react'
import NumberFormat from 'react-number-format'

export default function AmountFormat({ name, inputRef, onChange, ...other }) {
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
      suffix=" ₽"
    />
  )
}