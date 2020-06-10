import React, { useState, useContext } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import routes from "./routes";

import LayoutContext from "../Layout-context";
import AppBar from "../../../../components/UI/Navigation/AppBar/AppBar";
import Drawer from "../../../../components/UI/Navigation/Drawer/Drawer";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  const classes = useStyles();
  const { container } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
  });

  const context = useContext(LayoutContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbar({
      isOpen: true,
      message: message,
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
      <AppBar toggleDrawer={handleDrawerToggle} />
      <Drawer
        institution={context.institution}
        container={container}
        mobileOpen={mobileOpen}
        toggleDrawer={handleDrawerToggle}
        logoPath={context.logoPath}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {routes.map((route) => {
            if (route.type && route.type !== context.institution.type) {
              return null;
            }

            const Component = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={() => (
                  <Component {...props} openSnackbar={handleSnackbarOpen} />
                )}
              />
            );
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
  onLogout: PropTypes.func,
};

export default withRouter(Content);
