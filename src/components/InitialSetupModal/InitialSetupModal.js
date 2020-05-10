import React, { useState, useCallback, useMemo, useContext, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useTheme,
  makeStyles,
} from '@material-ui/core'
import firebase from '../../utils/firebase'
import styles from './styles'
import SetGoalForm from './SetGoalForm'
import AddMainSourceForm from './AddMainSourceForm'
import { UserDataContext } from '../UserDataProvider'

function getSteps() {
  return ['Поставьте цель', 'Добавьте источник дохода'];
}

const useStyles = makeStyles(styles)

const InitialSetupModal = ({open, handleClose}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const { userData, reloadUserData } = useContext(UserDataContext)

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  useEffect(() => {
    if (!userData || !userData.goal || !userData.currency) {
      return;
    }

    if (!userData.mainSource) {
      setActiveStep(1)
      return
    }

    setActiveStep(2)
  }, [userData])

  useEffect(() => {
    if (!userData) {
      return
    }

    if (userData && userData.goal && userData.currency) {
      setCompleted(completed => ({
        ...completed,
        0: true
      }))
    }

    if (userData.mainSource) {
      setCompleted(completed => ({
        ...completed,
        1: true
      }))
    }

    if (userData.extraSources && userData.extraSources.length) {
      setCompleted(completed => ({
        ...completed,
        2: true
      }))
    }
  }, [userData])

  const steps = getSteps()

  const stepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <SetGoalForm onSaveSuccess={reloadUserData} />;
      case 1:
        return <AddMainSourceForm onSaveSuccess={reloadUserData} />;
      default:
        return 'Вы здесь оказались по ошибке. Попробуйте обновить страницу!';
    }
  }, [activeStep, reloadUserData])

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      classes={{
        paper: classes.root
      }}
    >
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel completed={completed[index]}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {stepContent}

    </Dialog>
  )
}

export default InitialSetupModal