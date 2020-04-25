import React from 'react'
import { Card, CardContent, CardHeader, Grid, Typography, makeStyles } from '@material-ui/core'
import styles from './styles'

const useStyles = makeStyles(styles)

const MonthOverview = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardHeader title="Этот месяц: Апрель" />
      <CardContent className={classes.content}>
        <Grid container spacing={3} justify="space-around">
          <Grid item xs={12} md>
            <Typography variant="h4" component="span" className={classes.amount}>190000₽</Typography>
            <Typography variant="subtitle2" component="span" className={classes.caption}>Общий доход</Typography>
          </Grid>
          <Grid item xs={12} md>
            <Typography variant="h4" component="span" className={classes.amount}>190000₽</Typography>
            <Typography variant="subtitle2" component="span" className={classes.caption}>Сбережения</Typography>
          </Grid>
          <Grid item xs={12} md>
            <Typography variant="h4" component="span" className={classes.amount}>190000₽</Typography>
            <Typography variant="subtitle2" component="span" className={classes.caption}>Свободных средств</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MonthOverview