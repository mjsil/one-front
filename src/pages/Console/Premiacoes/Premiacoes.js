import React, { Component, Fragment } from 'react';

import axios from '../../../axios-instance';
import CustomTable from '../../../components/Table/CustomTable/CustomTable';
import styles from './Premiacoes.module.css';

class Premiacoes extends Component {
  state = {
    premiacoes: []
  }

  componentDidMount() {
    axios
      .get('/premiacao')
      .then((res) => {
        this.setState({ premiacoes: res.data });
      });
  }

  onDownloadPremiacaoHandler = (premiacaoId, fileDate) => {
    axios({
      url: 'downloadPremiacao',
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const currentDate = new Date().toLocaleDateString();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `data_de_saque-${currentDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
  }

  render() {
    return (
      <Fragment>
        <h1>Premiações</h1>
        <div className={styles.container}>
          <CustomTable
            rows={this.state.premiacoes}
            onClickDownload={this.onDownloadPremiacaoHandler}
          />
        </div>
      </Fragment>
    );
  }
}

export default Premiacoes;