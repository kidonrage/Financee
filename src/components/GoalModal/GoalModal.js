import React, { useState, useCallback, useMemo } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  useMediaQuery,
  MenuItem,
  useTheme,
  makeStyles,
  FormHelperText,
  withStyles
} from '@material-ui/core'
import moment from 'moment'
import firebase from '../../utils/firebase'
import AmountFormat from '../AmountFormat'
import styles from './styles'

const currencies = [
  {
    value: 'RUB',
    label: '₽',
  },
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  // {
  //   value: 'BTC',
  //   label: '฿',
  // },
];

const GoalTextField = withStyles({
  root: {
    '& .MuiInput-input': {
      fontSize: 24
    }
  },
})(TextField);

const useStyles = makeStyles(styles)

const GoalModal = ({open, handleClose}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [values, setValues] = useState({
    goal: '0',
    currency: 'RUB'
  })

  const untilDate = useMemo(() => {

    return moment().add(1, 'yers').format('DD.MM.YYYY')
  })

  const handleOpenModal = useCallback(() => {
    setValues({
      goal: '0',
      currency: 'RUB'
    })
  }, [])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleSave = () => {
    const {goal, currency} = values

    const currencyData = currencies.find(item => item.value === currency)

    firebase.setUserGoal(goal, currencyData)
      .then(() => {
        handleClose()
      })
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      onEnter={handleOpenModal}
    >
      <DialogTitle id="responsive-dialog-title">Поставить цель</DialogTitle>
      <DialogContent>

        <DialogContentText className={classes.formCaption}>Привет!</DialogContentText>
        <DialogContentText className={classes.formCaption}>Похоже, Вы только что зарегестрировались и ещё не поставили Цель, с которой будете работать в приложении. Самое время сделать это!</DialogContentText>
        <DialogContentText className={classes.formCaption}>Расскажите о своей <b>Цели на следующий год</b> и нажмите кнопку "Сохранить"</DialogContentText>

        <div className={classes.goalInputContainer}>

          <FormControl className={classes.valueInput}>
            <GoalTextField
              label={`Цель до ${untilDate}:`}
              value={values.goal}
              onChange={handleChange}
              name="goal"
              InputProps={{
                inputComponent: AmountFormat,
              }}
            />
          </FormControl> 

          <FormControl>
            <GoalTextField
              id="standard-select-currency"
              select
              name="currency"
              value={values.currency}
              onChange={handleChange}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </GoalTextField>
          </FormControl>

        </div>

        <FormHelperText id="my-helper-text">Не забудьте выбрать валюту, в которой будете вести учет.</FormHelperText>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary" autoFocus>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GoalModal