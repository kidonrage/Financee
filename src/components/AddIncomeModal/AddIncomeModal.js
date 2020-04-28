import React, { useState, useEffect } from 'react'
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
  FormHelperText,
  useMediaQuery,
  useTheme,
  makeStyles
} from '@material-ui/core'
import firebase from '../../utils/firebase'
import styles from './styles'
import AmountFormat from '../AmountFormat'
import AddIncomeSourceModal from '../AddIncomeSourceModal'

const useStyles = makeStyles(styles)

const AddIncomeModal = ({open, handleClose}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [incomeSourceModalOpen, setIncomeSourceModalOpen] = useState(false)
  const [incomeSources, setIncomeSources] = useState([])
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

  useEffect(() => {
    firebase.getIncomeSources()
      .then(setIncomeSources)
  }, [])

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Добавить новый доход</DialogTitle>
        <DialogContent>

          <DialogContentText className={classes.formCaption}>Выберите источник дохода, введите сумму и нажмите кнопку "Добавить"</DialogContentText>

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
                  inputComponent: AmountFormat,
                }}
              />
            </FormControl>

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
                disabled={!incomeSources.length}
              >
                {incomeSources.map((source, idx) => <MenuItem key={idx} value={JSON.stringify(source)}>{source.name}</MenuItem>)}
              </Select>
              <FormHelperText 
                className={classes.addIncomeSource}
                onClick={() => setIncomeSourceModalOpen(true)}
              >
                Добавить источник дохода
              </FormHelperText>
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
      <AddIncomeSourceModal 
        open={incomeSourceModalOpen}
        handleClose={() => setIncomeSourceModalOpen(false)}
        onAdd={(newIncomeSource) => {
          setIncomeSources([
            ...incomeSources,
            newIncomeSource
          ])
          setValues({
            ...values,
            incomeSource: JSON.stringify(newIncomeSource)
          })
        }}
      />
    </>
  )
}

export default AddIncomeModal