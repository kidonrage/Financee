import React from 'react'
import {Bar} from 'react-chartjs-2'
import { Card, CardHeader, Typography, makeStyles, CardContent } from '@material-ui/core'
import styles from './styles'
import getChartData from './mockData'

const useStyles = makeStyles(styles)

const FactPlanDifference = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Отклонение факта от плана"
      />
      <CardContent>
        <Bar
          data={getChartData()}
          options={{
            scales: {
              yAxes: [{
                ticks: {
                  callback: function(value, index, values) {
                      return value > 0 ? `+${value}%` : `${value}%`
                  }
                }
              }]
            }
          }}
        />
      </CardContent>
    </Card>
  )
}

export default FactPlanDifference