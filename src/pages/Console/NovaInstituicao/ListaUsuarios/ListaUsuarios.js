import React, { Fragment, Component } from 'react';

import StickyHeadTable from '../../../../components/Table/StickyHeadTable';
import axios from '../../../../axios-instance';
import styles from './ListaUsuarios.module.css';

const columns = [
  { id: 'name', label: 'Usuário', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 160 },
];

class PlanoSaude extends Component {
  state = {
    rows: []
  }

  componentDidMount() {
    axios
      .get('/users')
      .then((res) => {
        const users = res.data;
        this.setState({ rows: users })
      });
  }

  onSelectedRowHandler = (userId) => {
    this.props.history.push({
      pathname: this.props.match.url + '/form',
      state: { userId: userId }
    });
  }

  render() {
    return (
      <Fragment>
        <h1>Selecione usuário</h1>
        <div className={styles.tableContainer}>
          <StickyHeadTable
            columns={columns}
            rows={this.state.rows}
            onSelectedRow={this.onSelectedRowHandler}
          />
        </div>
      </Fragment>
    );
  }
}

export default PlanoSaude;