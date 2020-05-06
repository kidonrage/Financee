import React, { useState, useCallback, useMemo } from 'react'
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

function getSteps() {
  return ['Поставьте цель', 'Добавьте источник дохода', 'Планируйте'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <SetGoalForm />;
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

const useStyles = makeStyles(styles)

const InitialSetupModal = ({open, handleClose}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    // const {goal, currency} = values

    // const currencyData = currencies.find(item => item.value === currency)

    // firebase.setUserGoal(goal, currencyData)
    //   .then(() => {
    //     handleClose()
    //   })
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      // className={}
      classes={{
        paper: classes.root
      }}
      // onEnter={handleOpenModal}
    >
      {/* <DialogTitle id="responsive-dialog-title">
        
      </DialogTitle> */}

      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <DialogContent>
        
        {getStepContent(activeStep)}

      </DialogContent>
      <DialogActions>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
        >
          Назад
        </Button>
        <Button color="primary" autoFocus onClick={activeStep === steps.length - 1 ? handleSave : handleNext}>
          {activeStep === steps.length - 1 ? 'Сохранить' : 'Далее'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InitialSetupModal