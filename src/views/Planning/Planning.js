import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import { getContrastingColor } from 'react-color/lib/helpers'
import {
  Stepper,
  Step,
  StepButton,
  StepContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton
} from '@material-ui/core';

import SetGrowthPlanModal from '../../components/SetGrowthPlanModal';
import firebase from '../../utils/firebase'
import styles from './styles'
import GrowthCard from './GrowthCard';

const useStyles = makeStyles(styles);

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `При планировании первого месяца движения к Вашей цели, Вам нужно будет ввести .`;
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

  const [activeStep, setActiveStep] = useState(0);
  const [planningData, setPlanningData] = useState(null) 

  const steps = getSteps();

  useEffect(() => {
    // setLoading(true)

    firebase.getPlanningData()
      .then((fetchedData) => {
        setPlanningData(fetchedData)
      })
  }, [])

  useEffect(() => {

  })

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStepChange = (step) => () => {
    setActiveStep(step);
  };

  if (!planningData) {
    return <div>Тут ещё ничего нет</div>
  }

  return (
    <>
      <Typography variant="h2" component="h2" className={classes.header}>Планирование</Typography>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={8}>
          <Paper className={classes.root}>
            <Stepper nonLinear activeStep={activeStep} orientation="vertical">
              {planningData.monthsData.map((monthData, index) => (
                <Step key={index}>
                  <StepButton onClick={handleStepChange(index)} className={classes.monthTitle}>
                    <span>Месяц {index + 1}</span>
                    <span className={classes.monthDates}>{moment(monthData.startDate).utc().format("DD.MM.YYYY")} – {moment(monthData.endDate).utc().format("DD.MM.YYYY")}</span>
                  </StepButton>
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
                        {/* <Button
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
                        </Button> */}
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <GrowthCard />
        </Grid>
      </Grid>

      <SetGrowthPlanModal />
    </>
  )
}

export default Planning