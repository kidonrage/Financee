import React, { useState, useCallback } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  makeStyles
} from '@material-ui/core'
import styles from './styles'
import firebase from '../../utils/firebase'
import { getRandomColors } from '../../utils/colors'
import AddIncomeSourceForm from '../AddIncomeSourceForm/AddIncomeSourceForm'

const useStyles = makeStyles(styles)

const AddIncomeSourceModal = ({open, handleClose, onAdd}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

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

  const handleAdd = () => {
    const {name, expectedSavingPercentage, color} = values

    firebase.addIncomeSource(name, expectedSavingPercentage, color)
      .then(({data}) => {
        onAdd(data)
        handleClose()
      })
  }

  const handleOpenModal = useCallback(() => {
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
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      onEnter={handleOpenModal}
    >
      <DialogTitle id="responsive-dialog-title">Добавить новый источник дохода</DialogTitle>
      <DialogContent>

        <DialogContentText className={classes.formCaption}>Расскажите о новом источнике дохода и нажмите кнопку "Добавить"</DialogContentText>

        <AddIncomeSourceForm 
          name={values.name}
          expectedSavingPercentage={values.expectedSavingPercentage}
          color={values.color}
          colors={pickerColors}
          handleChange={handleChange}
          handleColorChange={handleColorChange}
        />      

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={handleAdd} color="primary" autoFocus>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddIncomeSourceModal