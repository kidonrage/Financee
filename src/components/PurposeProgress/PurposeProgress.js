import React, { useMemo } from 'react'
import { Card, CardContent, Typography, makeStyles, LinearProgress } from '@material-ui/core'
import styles from './styles'

const useStyles = makeStyles(styles)

const PurposeProgress = ({purposeCurrent = 0, purposeTotal = 0, currency = '₽'}) => {
  const classes = useStyles()

  const progressValue = useMemo(() => {
    if (!purposeCurrent || !purposeTotal) {
      return 0
    }

    return 100 / (purposeTotal / purposeCurrent)
  }, [purposeCurrent, purposeTotal])

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.purposeProgressInfo}>
          <div className={classes.purposeNumbers}>
            <Typography variant="h3" component="span" className={classes.purposeCurrent}>{purposeCurrent}/</Typography>
            <Typography variant="h5" component="span" className={classes.purposeTotal}>{purposeTotal}</Typography>
          </div>
          <div>
          <Typography variant="h3" component="span" className={classes.currency}>{currency}</Typography>
          </div>
        </div>
        <span className={classes.purposeProgressCaption}>Прогресс цели</span>
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