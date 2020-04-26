import React, { useState } from 'react'
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
import { BlockPicker } from 'react-color'
import styles from './styles'
import clsx from 'clsx'

const useStyles = makeStyles(styles)

const AddIncomeSourceModal = ({open, handleClose}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [pickerAnchor, setPickerAnchor] = React.useState(null);
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

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
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
            style={{backgroundColor: values.color}}
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
            />
          </Popover>
        </FormControl>        

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddIncomeSourceModal