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

const AddIncomeModal = ({open, handleClose}) => {
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
      <DialogTitle id="responsive-dialog-title">Добавить новый доход</DialogTitle>
      <DialogContent>

        <DialogContentText className={classes.formCaption}>Выберите источник дохода, введите сумму и нажмите кнопку "Добавить"</DialogContentText>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="incomeSourceLabel">Источник дохода</InputLabel>
            <Select 
              className={classes.incomeSource}
              labelId="incomeSourceLabel" 
              id="incomeSource" 
              name="incomeSource"
              value={values.incomeSource}
              onChange={handleChange}
              label="Источник дохода"
            >
              <MenuItem value="Источник 1">Источник 1</MenuItem>
              <MenuItem value="Источник 2">Источник 2</MenuItem>
            </Select>
          </FormControl>

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

export default AddIncomeModal