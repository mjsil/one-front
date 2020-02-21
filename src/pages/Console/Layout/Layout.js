import React, { Component } from 'react';
import axios from '../../../axios-instance';
import { getToken } from '../../../services/institution-token';

import Navbar from '../../../components/UI/Navbar/Navbar';
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

  render() {
    let contentToRender = null;

    if (this.state.institution) {
      contentToRender = (
        <Navbar institutionName={this.state.institution.name} />
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
