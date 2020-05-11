import React from 'react'
import { 
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  makeStyles
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';

const GrowthCard = () => {
  const classes = makeStyles(theme => ({

  }))
  
  return (
    <Card>
      <CardHeader 
        title="Планируемый рост" 
        action={
          <IconButton aria-label="settings">
            <EditIcon />
          </IconButton>
        }
        classes={{
          action: classes.cardAction
        }}
      />
      <CardContent className={classes.content}>
        <Typography variant="h4" component="span" className={classes.amount}>20%</Typography>
      </CardContent>
    </Card>
  )
}

export default GrowthCard