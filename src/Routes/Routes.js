import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthPage from '../pages/Auth/Auth';
import Layout from '../pages/Console/Layout/Layout';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const NotAuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/console', state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <NotAuthRoute exact path="/" component={AuthPage} />
      <AuthRoute path="/console" component={Layout} />
      <Route path="*" render={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;