import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import AuthPage from "../pages/Auth/Auth";
import Layout from "../pages/Console/Layout/Layout";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

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
        <Redirect
          to={{ pathname: "/console", state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <NotAuthRoute exact path="/" component={AuthPage} />
      <Route exact path="/reset/:token" component={ResetPassword} />
      <AuthRoute path="/console" component={Layout} />
      <Route path="*" component={() => <h1>404. Página não encontrada</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
