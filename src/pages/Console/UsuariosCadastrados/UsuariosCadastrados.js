import React, { Fragment, Component } from 'react';

import StickyHeadTable from '../../../components/Table/StickyHeadTable';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import axios from '../../../axios-instance';
import styles from './UsuariosCadastrados.module.css';

const columns = [
  { id: 'name', label: 'Usuário', minWidth: 60 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'birth', label: 'Nascimento', minWidth: 60 },
  { id: 'cpf', label: 'CPF', minWidth: 60 },
  { id: 'cep', label: 'CEP', minWidth: 60 },
  { id: 'address', label: 'Endereço', minWidth: 60 },
];

class UsuariosCadastrados extends Component {
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

  render() {
    return (
      <Fragment>
        <PrimaryHeading>Usuários Cadastrados</PrimaryHeading>
        <div className={styles.tableContainer}>
          <StickyHeadTable
            columns={columns}
            rows={this.state.rows}
          />
        </div>
      </Fragment>
    );
  }
}

export default UsuariosCadastrados;