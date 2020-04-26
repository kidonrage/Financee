import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import {
  Button,
  InputLabel,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  useMediaQuery,
  useTheme,
  makeStyles
} from '@material-ui/core'
import styles from './styles'

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator=" "
      isNumericString
      suffix=" ₽"
    />
  )
}

const useStyles = makeStyles(styles)

const AddExpenseModal = ({open, handleClose}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [values, setValues] = useState({
    incomeSource: '',
    incomeAmount: '0',
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Добавить новый расход</DialogTitle>
      <DialogContent>

        <DialogContentText className={classes.formCaption}>Введите сумму расхода и нажмите кнопку "Добавить"</DialogContentText>
        <DialogContentText className={classes.formCaption}><b>Свободных средств: 30000₽</b></DialogContentText>
        

        <FormControl className={classes.formControl}>
            <TextField
              className={classes.incomeAmount}
              label="Сумма"
              value={values.incomeAmount}
              onChange={handleChange}
              name="incomeAmount"
              variant="outlined"
              id="formatted-incomeAmount-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
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

export default AddExpenseModal