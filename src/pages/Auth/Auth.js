import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login/Login';
import styles from './Auth.module.css';

class Auth extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="*" render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default Auth;
