import React from 'react'
import NumberFormat from 'react-number-format'

const PercentageFormat = ({ name, inputRef, onChange, ...other }) => (
  <NumberFormat
    {...other}
    getInputRef={inputRef}
    isAllowed={(values) => {
      const {floatValue} = values;
      return floatValue >= 0 &&  floatValue <= 100;
    }}
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
    suffix="%"
  />
)

export default PercentageFormat