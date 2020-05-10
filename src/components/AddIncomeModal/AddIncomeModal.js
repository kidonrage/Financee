import React, { useState, useEffect, useCallback, useContext } from 'react'
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
import { UserDataContext } from '../UserDataProvider'

const useStyles = makeStyles(styles)

const AddIncomeModal = ({open, handleClose}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [incomeSourceModalOpen, setIncomeSourceModalOpen] = useState(false)
  const [values, setValues] = useState({
    sourceId: '',
    incomeAmount: '0',
    goalSaving: '0'
  })

  const {incomeSources, reloadUserData} = useContext(UserDataContext)

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const {incomeAmount, goalSaving, sourceId} = values

    let incomeSource = incomeSources.find(source => source.id === sourceId)
    
    firebase.addIncome(incomeAmount, goalSaving, incomeSource)
      .then(() => {
        alert("Доход добавлен успешно!")
        handleOpenModal()
      })
  }

  const handleOpenModal = useCallback(() => {
    setValues({
      sourceId: '',
      incomeAmount: '0',
      goalSaving: '0'
    })
  }, [])

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        onEnter={handleOpenModal}
      >
        <DialogTitle id="responsive-dialog-title">Добавить новый доход</DialogTitle>

        <form onSubmit={handleSubmit}>

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
                InputProps={{
                  inputComponent: AmountFormat,
                }}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                className={classes.goalSaving}
                label="Инвестировано в цель"
                value={values.goalSaving}
                onChange={handleChange}
                name="goalSaving"
                variant="outlined"
                InputProps={{
                  inputComponent: AmountFormat,
                }}
              />
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="incomeSourceLabel">{incomeSources.length ? "Источник дохода" : "Нет источников дохода"}</InputLabel>
              <Select 
                className={classes.incomeSource}
                labelId="incomeSourceLabel" 
                id="sourceId" 
                name="sourceId"
                value={values.sourceId}
                onChange={handleChange}
                label={incomeSources.length ? "Источник дохода" : "Нет источников дохода"}
                disabled={!incomeSources.length}
              >
                {incomeSources.map((source, idx) => <MenuItem key={idx} value={source.id}>{source.name}</MenuItem>)}
              </Select>
              {incomeSources.length < 5 && (
                <FormHelperText 
                  className={classes.addIncomeSource}
                  onClick={() => setIncomeSourceModalOpen(true)}
                >
                  Добавить источник дохода
                </FormHelperText>
              )}
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button autoFocus onClick={handleClose} color="secondary">
              Отмена
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Добавить
            </Button>
          </DialogActions>

        </form>

      </Dialog>
      <AddIncomeSourceModal 
        open={incomeSourceModalOpen}
        handleClose={() => setIncomeSourceModalOpen(false)}
        onAdd={(newIncomeSource) => {
          console.log(newIncomeSource)
          reloadUserData();
          setValues({
            ...values,
            sourceId: newIncomeSource.id
          })
        }}
      />
    </>
  )
}

export default AddIncomeModal