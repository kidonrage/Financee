import React from 'react'
import PurposeProgress from '../../components/PurposeProgress'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import styles from './styles'
import FactPlanDifference from '../../components/FactPlanDifference'

const useStyles = makeStyles(styles)

const Dashborad = () => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h2" component="h2" className={classes.header}>Добро пожаловать, Влад!</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <PurposeProgress
            purposeCurrent={69000}
            purposeTotal={500000}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FactPlanDifference />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashborad