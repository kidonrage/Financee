import { green } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme()

export default createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: '#11cb5f',
    },
  },
  typography: {
    h2: {
      fontSize: '1.2rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '2.4rem',
      },
    },
    h3: {
      fontSize: '2rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
    }
  },
});