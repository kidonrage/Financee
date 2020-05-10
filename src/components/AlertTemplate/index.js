import React from 'react';
import { makeStyles } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const AlertTemplate = ({ style, options, message, close }) => {
  const useStyles = makeStyles(theme => {
    const backgroundColors = {
      info: theme.palette.info.main,
      error: theme.palette.error.main,
      success: theme.palette.success.main
    };
    return {
      root: {
        position: 'relative',
        color: '#fff',
        backgroundColor: backgroundColors[options.type],
        padding: theme.spacing(2, 4),
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        width: 450,
        [theme.breakpoints.down('sm')]: {
          width: '95vw',
        }
      },
      icon: {
        marginRight: theme.spacing(1)
      }
    };
  });

  const classes = useStyles();

  return (
    <div className={classes.root} style={style}>
      {options.type === 'info' && <ErrorOutlineIcon className={classes.icon}/>}
      {options.type === 'success' && <CheckCircleOutlineIcon className={classes.icon}/> }
      {options.type === 'error' && <HighlightOffIcon className={classes.icon}/>}
      {message}
    </div>
  );
};

export default AlertTemplate;
