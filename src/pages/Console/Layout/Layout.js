import React, { Component } from 'react';
import axios from '../../../axios-instance';
import { getToken } from '../../../services/institution-token';

import Navigation from '../../../components/UI/Navigation/Navigation';
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
        <Navigation institutionName={this.state.institution.name} />
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
