import React, { useState, useCallback } from 'react'
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
import PercentageFormat from '../PercentageFormat'

const useStyles = makeStyles(styles)

const defaultValues = {
  name: '',
  color: '#000',
  expectedSavingPercentage: '20'
}

const AddIncomeSourceModal = ({open, handleClose, onAdd}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [pickerAnchor, setPickerAnchor] = React.useState(null);
  const [pickerColors, setPickerColors] = React.useState([]);
  const [values, setValues] = useState(defaultValues)

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
    const {name, color, expectedSavingPercentage} = values

    firebase.addIncomeSource(name, color, expectedSavingPercentage)
      .then(() => {
        onAdd({
          name, 
          color,
          expectedSavingPercentage
        })
      })
      .catch(error => {
        if (error.code === 'permission-denied') {
          alert("Permission denied!")
          return
        }

        console.error("Error!", JSON.stringify(error))
      })
      .finally(() => {
        handleClose()
      })
  }

  const handleOpenModal = useCallback(() => {
    getRandomColors()
      .then(colors => {
        setPickerColors(colors)
        setValues({
          ...defaultValues,
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

        <FormControl className={classes.formControl}>
          <TextField
            label="Название"
            value={values.name}
            onChange={handleChange}
            name="name"
            variant="outlined"
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            label="Планируемый % сохранения от дохода"
            value={values.expectedSavingPercentage}
            onChange={handleChange}
            name="expectedSavingPercentage"
            variant="outlined"
            InputProps={{
              inputComponent: PercentageFormat,
            }}
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
            label={values.name}
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