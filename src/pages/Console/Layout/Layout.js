import React, { Component } from 'react';
import axios from '../../../axios-instance';
import { getToken, removeToken } from '../../../services/institution-token';
import { logout } from '../../../services/auth';

import Content from './Content/Content';
import styles from './Layout.module.css';

class Layout extends Component {
  state = {
    institution: null
  }

  componentDidMount() {
    const institutionToken = getToken();
    axios
      .get('/institutions/' + institutionToken)
      .then(res => {
        this.setState({ institution: res.data })
      });
  }

  onLogoutHandler = async () => {
    await removeToken();
    await logout();
    this.props.history.replace('/');
  }

  render() {
    let contentToRender = null;

    if (this.state.institution) {
      contentToRender = (
        <Content
          institutionName={this.state.institution.name}
          onLogout={this.onLogoutHandler} />
      );
    }
    return (
      <section className={styles.Layout}>
        {contentToRender}
      </section>
    );
  }
}

export default Layout;
