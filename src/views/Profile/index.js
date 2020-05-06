import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IncomeSourcesView from './IncomeSourcesView';
import ProfileView from './ProfileView';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(2)
  }
}));

const Profile = () => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Paper className={classes.root}>

      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Профиль" />
        <Tab label="Источники дохода" />
        {/* <Tab label="Статистика" disabled /> */}
      </Tabs>

      <div className={classes.content}>
        {tab === 0 && (
          <ProfileView />
        )}

        {tab === 1 && (
          <IncomeSourcesView />
        )}
      </div>

    </Paper>
  )
}

export default Profile