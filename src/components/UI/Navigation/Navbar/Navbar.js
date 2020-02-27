import React, { Fragment } from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#3399ff',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  avatar: {
    width: 'fit-content',
    fontWeight: 'bold',
    color: "#eee",
    backgroundColor: '#005ce6',
    '&:hover': {
      backgroundColor: '#80c1ff'
    }
  }
}));

function Navbar(props) {
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
          <Button className={classes.avatar}>
            {props.institutionName}
          </Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default Navbar;