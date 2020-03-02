import React, { Fragment } from 'react';

import { withRouter } from 'react-router-dom';
import Dropdown from './Dropdown/Dropdown';
import routes from './metadata/routes';
import logo from '../../../../assets/Logo.png';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerContainer: {
    height: '100%', 
    backgroundColor: '#18202c'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0 10px 0',
    '&:hover': {
      cursor: 'pointer'
    },
    backgroundColor: '#242B37'
  },
  divider: {
    backgroundColor: '#85909D'
  },
  logo: {
    width: '200px',
    height: '80px'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const redirectToConsole = () => {
    props.history.push('/console');
  }

  const drawer = (
    <div className={classes.drawerContainer}>
      <div className={classes.logoContainer} onClick={redirectToConsole}>
        <img src={logo} alt="Onenet" className={classes.logo} />
      </div>
      <Divider className={classes.divider}/>
      {routes.map((route, index) => (
        <Dropdown
          key={index}
          parentName={route.parentName}
          parentIcon={route.parentIcon}
          childrens={route.childrens}
        />
      ))}
    </div>
  );

  return (
    <Fragment>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.mobileOpen}
            onClose={props.toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </Fragment>
  );
}

export default withRouter(ResponsiveDrawer);