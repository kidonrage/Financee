import React, { useState, useEffect } from 'react'
import {
  DialogContentText, makeStyles, DialogContent, DialogActions, Button
} from '@material-ui/core'
import AddIncomeSourceForm from '../../AddIncomeSourceForm'
import styles from './styles'
import { getRandomColors } from '../../../utils/colors'

const useStyles = makeStyles(styles)

const AddMainSourceForm = ({onSaveSuccess}) => {
  const classes = useStyles()

  const [pickerColors, setPickerColors] = React.useState([]);
  const [values, setValues] = useState({
    name: '',
    expectedSavingPercentage: '20',
    color: '#000'
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleColorChange = (color) => {
    setValues({
      ...values,
      color: color.hex
    })
  }

  const handleSave = () => {
    onSaveSuccess()
  }

  useEffect(() => {
    getRandomColors()
      .then(colors => {
        setPickerColors(colors)
        setValues({
          name: '',
          color: colors[0]
        })
      })
  }, []) 

  return (
    <>
      <DialogContent>
        <DialogContentText>Расскажите о своём <b>первом дополнительном источнике дохода</b> и нажмите кнопку "Далее"</DialogContentText>

        <div className={classes.form}>
          <AddIncomeSourceForm 
            name={values.name}
            expectedSavingPercentage={values.expectedSavingPercentage}
            color={values.color}
            colors={pickerColors}
            handleChange={handleChange}
            handleColorChange={handleColorChange}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" autoFocus onClick={handleSave}>
          Сохранить
        </Button>
      </DialogActions>
    </>
  )
}

export default AddMainSourceForm