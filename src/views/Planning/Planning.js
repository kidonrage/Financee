import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { getContrastingColor } from 'react-color/lib/helpers'
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@material-ui/core';
import SetGrowthPlanModal from '../../components/SetGrowthPlanModal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

const Planning = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const months = [1,2,3,4,5,6,7,8,9,10,11,12]

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {months.map((monthData, index) => (
              <Step key={index}>
                <StepLabel>Месяц {index + 1}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Источник</TableCell>
                          <TableCell align="right">Доход (план)</TableCell>
                          <TableCell align="right">Доход (реальный)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <Chip
                              label={"Тест"}
                              style={{
                              backgroundColor: "#432544",
                              color: getContrastingColor("#432544")
                            }}
                            />
                          </TableCell>
                          <TableCell align="right">500 р.</TableCell>
                          <TableCell align="right">500 р.</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </Paper>

      <SetGrowthPlanModal />
    </>
  )
}

export default Planning