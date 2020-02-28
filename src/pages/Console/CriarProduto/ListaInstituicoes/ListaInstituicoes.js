import React, { Component, Fragment } from 'react';

import StickyHeadTable from '../../../../components/Table/StickyHeadTable';
import Modal from '../../../../components/UI/Modal/Modal';
import axios from '../../../../axios-instance';
import styles from './ListaInstituicoes.module.css';

const columns = [
  { id: 'name', label: 'Instituição', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 160 },
];


class ListaInstituicoes extends Component {
  state = {
    rows: [],
    selectedInstitution: {},
    showModal: false
  }

  componentDidMount() {
    axios
      .get('/institutions')
      .then((res) => {
        const institutions = res.data;
        this.setState({ rows: institutions })
      });
  }

  onSelectedRowHandler = (institutionId) => {
    const institutions = [...this.state.rows];
    const fetchedInstitution = institutions.find(i => {
      return i.id === institutionId;
    });
    
    this.setState({ selectedInstitution: fetchedInstitution });
    this.openModalHandler();
  }

  openModalHandler = () => {
    this.setState({ showModal: true });
  }

  closeModalHandler = () => {
    this.setState({ showModal: false });
  }

  render() {
    console.log(this.state.selectedInstitution);
    return (
      <Fragment>
        <h1>Selecione a instituição</h1>
        <div className={styles.tableContainer}>
          <StickyHeadTable
            columns={columns}
            rows={this.state.rows}
            onSelectedRow={this.onSelectedRowHandler}
          />
        </div>
        <Modal
          open={this.state.showModal}
          handleClose={this.closeModalHandler}
        >
          <h1>Criar Produto</h1>
          <h3>{this.state.selectedInstitution.name}</h3>
          <p>{this.state.selectedInstitution.email}</p>
        </Modal>
      </Fragment>
    );
  }
}

export default ListaInstituicoes;