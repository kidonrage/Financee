import React, { useState, useEffect } from 'react'
import {
  DialogContentText, makeStyles, DialogContent, DialogActions, Button, CircularProgress
} from '@material-ui/core'
import AddIncomeSourceForm from '../../AddIncomeSourceForm'
import styles from './styles'
import { getRandomColors } from '../../../utils/colors'
import firebase from '../../../utils/firebase'

const useStyles = makeStyles(styles)

const AddMainSourceForm = ({onSaveSuccess}) => {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [pickerColors, setPickerColors] = useState([]);
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
    setLoading(true)

    const {name, expectedSavingPercentage, color} = values

    firebase.setMainIncomeSource(name, expectedSavingPercentage, color)
      .then(() => {
        onSaveSuccess()
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getRandomColors()
      .then(colors => {
        setPickerColors(colors)
        setValues({
          name: '',
          expectedSavingPercentage: '20',
          color: colors[0]
        })
      })
  }, []) 

  return (
    <>
      <DialogContent>
        <DialogContentText>Расскажите о своём <b>основном источнике дохода</b> и нажмите кнопку "Далее"</DialogContentText>

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
        <div className={classes.saveBtnWrapper}>
          <Button variant="contained" color="primary" disabled={loading} onClick={handleSave}>
            Сохранить
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </DialogActions>
    </>
  )
}

export default AddMainSourceForm