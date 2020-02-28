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
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0 10px 0',
    '&:hover': {
      cursor: 'pointer'
    }
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
    <div>
      <div className={classes.logoContainer} onClick={redirectToConsole}>
        <img src={logo} alt="Onenet" className={classes.logo} />
      </div>
      <Divider />
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
              keepMounted: true, // Better open performance on mobile.
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