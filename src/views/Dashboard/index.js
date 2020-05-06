import React, { useContext, useEffect, useState } from 'react'
import PurposeProgress from '../../components/PurposeProgress'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import styles from './styles'
import FactPlanDifference from '../../components/FactPlanDifference'
import MonthOverview from '../../components/MonthOverview'
import { AuthContext } from '../../components/Auth'
import firebase from '../../utils/firebase'
import { LoadingContext } from '../../components/Loading'

const useStyles = makeStyles(styles)

const Dashborad = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const { loading, setLoading } = useContext(LoadingContext)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    setLoading(true)

    firebase.getUserData()
      .then(setUserData)
      .catch(() => setUserData({
        goal: 0,
        goalProgress: 0
      }))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Typography variant="h2" component="h2" className={classes.header}>Добро пожаловать, {currentUser.displayName}!</Typography>
      <Grid container spacing={3} alignItems="stretch">
        <Grid className={classes.bottomSpacingGrid} item xs={12} md={6} direction="column" alignItems="stretch" container>
          <Grid item>
            <PurposeProgress
              goalSavings={userData.goalProgress}
              goalTotal={userData.goal}
              currency={currentUser.customClaims.currency}
            />
          </Grid>
          <Grid item>
            <MonthOverview currency={currentUser.customClaims.currency} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <FactPlanDifference currency={currentUser.customClaims.currency} />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashborad