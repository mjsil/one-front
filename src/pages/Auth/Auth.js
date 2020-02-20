import React, { Component } from 'react';

import Login from './Login/Login';
import styles from './Auth.module.css';

class Auth extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Login />
      </div>
    );
  }
}

export default Auth;
