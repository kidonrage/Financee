import React, { useState, useEffect, useContext } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  FormHelperText,
  Popover,
  Chip,
  useMediaQuery,
  useTheme,
  makeStyles
} from '@material-ui/core'
import clsx from 'clsx'
import { BlockPicker } from 'react-color'
import { getContrastingColor } from 'react-color/lib/helpers'
import styles from './styles'
import firebase from '../../utils/firebase'
import { getRandomColors } from '../../utils/colors'
import { AuthContext } from '../Auth'

const useStyles = makeStyles(styles)

const AddIncomeSourceModal = ({open, handleClose}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const {currentUser} = useContext(AuthContext)

  const [pickerAnchor, setPickerAnchor] = React.useState(null);
  const [pickerColors, setPickerColors] = React.useState([]);
  const [values, setValues] = useState({
    sourceName: '',
    color: '#000'
  })

  const pickerOpen = Boolean(pickerAnchor);

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

  const handlePickerOpen = (event) => {
    setPickerAnchor(event.currentTarget);
  };

  const handlePickerClose = () => {
    setPickerAnchor(null);
  };

  const handleAdd = () => {
    const {sourceName, color} = values

    console.log(currentUser.uid)

    const userDocRef = firebase.db.collection(`users`).doc('0')
    userDocRef.collection('incomeSources')
    .add({
      name: sourceName,
      color
    })
    .catch(error => {
      if (error.code === 'permission-denied') {
        alert("Permission denied!")
        return
      }

      console.error("Error!")
    })
    .finally(() => handleClose())
  }

  useEffect(() => {
    getRandomColors()
      .then(colors => {
        setPickerColors(colors)
        setValues({
          sourceName: '',
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
    >
      <DialogTitle id="responsive-dialog-title">Добавить новый источник дохода</DialogTitle>
      <DialogContent>

        <DialogContentText className={classes.formCaption}>Расскажите о новом источнике дохода и нажмите кнопку "Добавить"</DialogContentText>

        <FormControl className={classes.formControl}>
          <TextField
            className={classes.sourceName}
            label="Название"
            value={values.sourceName}
            onChange={handleChange}
            name="sourceName"
            variant="outlined"
          />
        </FormControl>

        <FormControl className={clsx(classes.formControl, classes.colorControl)}>
          <FormHelperText className={classes.colorInputCaption}>
            Выберите цвет отметки:
          </FormHelperText>
          <Chip 
            size="small" 
            className={classes.colorInput} 
            style={{
              backgroundColor: values.color,
              color: getContrastingColor(values.color)
            }}
            onClick={handlePickerOpen}
            label={values.sourceName}
          />
          <Popover 
            open={pickerOpen}
            anchorEl={pickerAnchor}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: -8,
              horizontal: 'center',
            }}
            onClose={handlePickerClose}
            classes={{
              paper: classes.colorInputPopover
            }}
          >
            <BlockPicker 
              color={ values.color }
              onChangeComplete={ handleColorChange }
              onChange={ handleColorChange }
              colors={pickerColors}
            />
          </Popover>
        </FormControl>        

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