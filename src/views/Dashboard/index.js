import React, { useContext, useEffect, useState } from 'react'
import PurposeProgress from '../../components/PurposeProgress'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import styles from './styles'
import FactPlanDifference from '../../components/FactPlanDifference'
import MonthOverview from '../../components/MonthOverview'
import { AuthContext } from '../../components/Auth'
import { UserDataContext } from '../../components/UserDataProvider'
import firebase from '../../utils/firebase'
import { LoadingContext } from '../../components/Loading'

const useStyles = makeStyles(styles)

const Dashborad = () => {
  const classes = useStyles()
  const { authData } = useContext(AuthContext)
  const { userData } = useContext(UserDataContext)
  const { loading, setLoading } = useContext(LoadingContext)
  const [dashboardData, setDashboardData] = useState({})

  useEffect(() => {
    setLoading(true)

    firebase.getUserData()
      .then(setDashboardData)
      .catch(() => setDashboardData({
        goalProgress: 0
      }))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>Грузим блять</div>
  }

  return (
    <>
      <Typography variant="h2" component="h2" className={classes.header}>Добро пожаловать, {authData.displayName}!</Typography>
      <Grid container spacing={3} alignItems="stretch">
        <Grid className={classes.bottomSpacingGrid} item xs={12} md={6} direction="column" alignItems="stretch" container>
          <Grid item>
            <PurposeProgress
              goalSavings={dashboardData.goalProgress}
              goalTotal={userData.goal}
              currency={userData.currency.label}
            />
          </Grid>
          <Grid item>
            <MonthOverview currency={userData.currency.label} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <FactPlanDifference currency={userData.currency.label} />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashborad