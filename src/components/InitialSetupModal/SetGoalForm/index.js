import React, {useMemo, useState} from 'react'
import {
  DialogContentText,
  FormControl,
  MenuItem,
  makeStyles,
  TextField,
  withStyles,
  FormHelperText,
  DialogActions,
  Button,
  DialogContent,
  CircularProgress,
} from '@material-ui/core'
import AmountFormat from '../../AmountFormat'
import moment from 'moment'
import styles from './styles'
import firebase from '../../../utils/firebase'

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
];

const GoalTextField = withStyles({
  root: {
    '& .MuiInput-input': {
      fontSize: 32
    }
  },
})(TextField);

const useStyles = makeStyles(styles)

const SetGoalForm = ({onSaveSuccess}) => {
  const classes = useStyles()

  const [values, setValues] = useState({
    goal: '0',
    currency: 'RUB'
  })
  const [loading, setLoading] = React.useState(false);

  const untilDate = useMemo(() => {
    return moment().add(1, 'yers').format('DD.MM.YYYY')
  }, [])
  
  const handleChange = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSave = () => {
    setLoading(true)

    const {goal, currency} = values

    const currencyData = currencies.find(item => item.value === currency)

    firebase.setUserGoal(goal, currencyData)
      .then(() => {
        onSaveSuccess()
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
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

export default SetGoalForm