import React, { useMemo } from 'react'
import { Card, CardContent, Typography, makeStyles, LinearProgress, CardHeader } from '@material-ui/core'
import styles from './styles'

const useStyles = makeStyles(styles)

const PurposeProgress = ({goalSavings = 0, goalTotal = 0, currency = '₽'}) => {
  const classes = useStyles()

  const progressValue = useMemo(() => {
    if (!goalSavings || !goalTotal) {
      return 0
    }

    return 100 / (goalTotal / goalSavings)
  }, [goalSavings, goalTotal])

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Прогресс цели"
      />
      <CardContent>
        <div className={classes.purposeProgressInfo}>
          <div className={classes.purposeNumbers}>
            <Typography variant="h3" component="span" className={classes.goalSavings}>{goalSavings}/</Typography>
            <Typography variant="h5" component="span" className={classes.goalTotal}>{goalTotal}</Typography>
          </div>
          <div>
          <Typography variant="h3" component="span" className={classes.currency}>{currency}</Typography>
          </div>
        </div>
        {/* <span className={classes.purposeProgressCaption}></span> */}
        <LinearProgress 
          className={classes.progressBar} 
          variant="determinate" 
          value={progressValue} 
        />
      </CardContent>
    </Card>
  )
}

export default PurposeProgress