import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#18202c',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  title: {
    fontWeight: 700
  },
  logoutBtn: {
    position: 'absolute',
    color: '#eee',
    right: '30px',
    display: 'flex',
    alignItems: 'center',
    padding: '2px 5px 2px 5px',
    backgroundColor: '#3B5067',
    border: '2px solid currentcolor',
    '&:hover': {
      cursor: 'pointer',
      color: '#EE2D03'
    }
  }
}));

function AppBarComponent(props) {
  const classes = useStyles();
  
  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            {props.institutionName}
          </Typography>
          <button className={classes.logoutBtn} onClick={props.onLogout}>
            <ExitToAppIcon />
            <h3>Logout</h3>
          </button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

AppBarComponent.propTypes = {
  toggleDrawer: PropTypes.func,
  institutionName: PropTypes.string,
  onLogout: PropTypes.func
}

export default AppBarComponent;