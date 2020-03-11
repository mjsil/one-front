import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from './routes';

import AppBar from '../../../../components/UI/Navigation/AppBar/AppBar';
import Drawer from '../../../../components/UI/Navigation/Drawer/Drawer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Content(props) {
  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: ''
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbar({
      isOpen: true,
      message: message
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      isOpen: false,
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        onLogout={props.onLogout}
        institutionName={props.institution.name}
        toggleDrawer={handleDrawerToggle} />
      <Drawer
        container={container}
        mobileOpen={mobileOpen}
        toggleDrawer={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {routes.map(route => {
            const Component = route.component;
            return <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={() => (
                <Component {...props} openSnackbar={handleSnackbarOpen} />
              )} />
          })}
        </Switch>
        <Snackbar
          open={snackbar.isOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
}

Content.propTypes = {
  institution: PropTypes.object,
  onLogout: PropTypes.func
}

export default withRouter(Content);