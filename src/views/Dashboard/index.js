import React from 'react'
import PurposeProgress from '../../components/PurposeProgress'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import styles from './styles'
import FactPlanDifference from '../../components/FactPlanDifference'
import MonthOverview from '../../components/MonthOverview'

const useStyles = makeStyles(styles)

const Dashborad = () => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h2" component="h2" className={classes.header}>Добро пожаловать, Влад!</Typography>
      <Grid container spacing={3} alignItems="stretch">
        <Grid className={classes.bottomSpacingGrid} item xs={12} md={6} direction="column" alignItems="stretch" container>
          <Grid item>
            <PurposeProgress
              purposeCurrent={69000}
              purposeTotal={500000}
            />
          </Grid>
          <Grid item>
            <MonthOverview />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <FactPlanDifference />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashborad