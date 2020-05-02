import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import styles from './styles'

const useStyles = makeStyles(styles)

const Spinner = ({className, ...props}) => {
  const classes = useStyles()
  
  return (
    <div className={clsx(classes.root, className)} {...props}>
      <CircularProgress
        style={{
          width: '100%',
          height: 'auto'
        }}
        color="primary" 
      />
    </div>
  )
}

export default Spinner