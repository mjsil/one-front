import React, { Component, Fragment } from 'react';

import axios from '../../../axios-instance';
import LinearProgress from '@material-ui/core/LinearProgress';
import StickyHeadTable from '../../../components/Table/StickyHeadTable';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import InputGroup from '../../../components/Form/Group/InputGroup/InputGroup';
import Button from '../../../components/Form/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import ErrorMessage from '../../../components/Form/ErrorMessage/ErrorMessage';
import styles from './CriarProduto.module.css';

const columns = [
  { id: 'name', label: 'Instituição', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 160 },
];

class ListaInstituicoes extends Component {
  state = {
    rows: [],
    formData: {
      valor_produto: null,
      local_input: null,
      nome_produto: null,
      data_cancelamento: null,
      percentual_retorno: null,
      percentual_vendedor: null,
      percentual_instituicao: null,
      percentual_1net: null
    },
    locals: ['Brasília'],
    selectedInstitution: {},
    showModal: false,
    loading: false,
    errorMessage: null
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
    this.eraseFormAndLocalData();
    this.setState({ showModal: false });
  }

  onInputChangeHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const formData = { ...this.state.formData };
    formData[inputName] = inputValue;

    this.setState({ formData: formData });
  }

  onAddLocalHandler = (event) => {
    event.preventDefault();
    const localInput = this.state.formData.local_input;
    const locals = [...this.state.locals];
    locals.push(localInput);
    this.setState({ locals: locals });
  }

  onRemoveLocalHandler = (localIndex) => {
    const locals = [...this.state.locals];
    locals.splice(localIndex, 1);
    this.setState({ locals: locals });
  }

  onPostProductHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = { ...this.state.formData };
    const locals = [...this.state.locals];
    const idInstitution = this.state.selectedInstitution.id;
    const postData = {
      id_instituicao: idInstitution,
      valor_produto: +formData.valor_produto,
      local: locals,
      nome_produto: formData.nome_produto,
      data_cancelamento: formData.data_cancelamento,
      percentual_retorno: +formData.percentual_retorno,
      percentual_vendedor: +formData.percentual_vendedor,
      percentual_instituicao: +formData.percentual_instituicao,
      percentual_1net: +formData.percentual_1net
    };

    const percentual_total = (
      postData.percentual_vendedor +
      postData.percentual_instituicao +
      postData.percentual_1net
    );
    
    if (percentual_total !== 100) {
      return this.setState({
        errorMessage: 'Percentual total deve ser igual a 100',
        loading: false
      });
    }

    axios
      .post('/products', postData)
      .then(res => {
        const error = res.data.error;
        if (error) {
          return this.setState({ errorMessage: error, loading: false });
        }

        this.closeModalHandler();
      })
      .catch(err => {
        if (err.response.data) {
          this.setState({ errorMessage: err.response.data.error })
        }
        this.setState({ loading: false })
      });
  }

  eraseFormAndLocalData = () => {
    const locals = ['Brasília'];
    const formData = { ...this.state.formData };
    for (let key in formData) {
      formData[key] = null;
    }

    this.setState({
      locals: locals,
      formData: formData,
      loading: false,
      errorMessage: null
    });
  }

  render() {
    let modalBottomContent = <Button type='submit'>Criar Produto</Button>;
    if (this.state.loading) {
      modalBottomContent = <LinearProgress />
    }

    let errorMessage = null;
    if (this.state.errorMessage) {
      errorMessage = <ErrorMessage>{this.state.errorMessage}</ErrorMessage>;
    }

    return (
      <Fragment>
        <PrimaryHeading>Selecione a instituição</PrimaryHeading>
        <div className={styles.tableContainer}>
          <StickyHeadTable
            columns={columns}
            rows={this.state.rows}
            onSelectedRow={this.onSelectedRowHandler}
          />
        </div>
        <Modal
          className={styles.modal}
          open={this.state.showModal}
          handleClose={this.closeModalHandler}
        >
          <div className={styles.modalContent}>
            <CloseIcon className={styles.closeIcon} onClick={this.closeModalHandler} />
            <PrimaryHeading>Criar Produto</PrimaryHeading>
            {errorMessage}
            <div className={styles.institutionData}>
              <h3>{this.state.selectedInstitution.name}</h3>
              <p>{this.state.selectedInstitution.email}</p>
            </div>
            <form onSubmit={this.onPostProductHandler} className={styles.form}>
              <div className={styles.groups}>
                <div className={styles.left}>
                  <InputGroup
                    label='Nome do Produto'
                    inputName='nome_produto'
                    inputType='text'
                    inputOnChange={this.onInputChangeHandler}
                  />
                  <InputGroup
                    label='Valor do Produto'
                    inputName='valor_produto'
                    inputType='number'
                    inputStep='.1'
                    inputOnChange={this.onInputChangeHandler}
                  />
                  <InputGroup
                    label='Data de Cancelamento'
                    inputName='data_cancelamento'
                    inputType='number'
                    inputOnChange={this.onInputChangeHandler}
                    inputMin={0}
                  />
                  <InputGroup
                    label='Local'
                    inputName='local_input'
                    inputType='text'
                    inputOnChange={this.onInputChangeHandler}
                  />
                  <button className={styles.btnAddLocal} onClick={this.onAddLocalHandler}>
                    <AddIcon className={styles.addIcon} />
                    Adicionar local
                </button>
                </div>
                <div className={styles.right}>
                  <InputGroup
                    label='Percentual Retorno (0-100)'
                    inputName='percentual_retorno'
                    inputType='number'
                    inputMin='0'
                    inputMax='100'
                    inputOnChange={this.onInputChangeHandler}
                  />
                  <InputGroup
                    label='Percentual Vendedor'
                    inputName='percentual_vendedor'
                    inputType='number'
                    inputMin='0'
                    inputMax='100'
                    inputOnChange={this.onInputChangeHandler}
                  />
                  <InputGroup
                    label='Percentual Instituição'
                    inputName='percentual_instituicao'
                    inputType='number'
                    inputMin='0'
                    inputMax='100'
                    inputOnChange={this.onInputChangeHandler}
                  />
                  <InputGroup
                    label='Percentual 1net'
                    inputName='percentual_1net'
                    inputType='number'
                    inputMin='0'
                    inputMax='100'
                    inputOnChange={this.onInputChangeHandler}
                  />
                </div>
              </div>
              <div className={styles.chipsContainer}>
                {this.state.locals.map((local, index) => (
                  <Chip
                    key={index}
                    label={local}
                    onDelete={() => this.onRemoveLocalHandler(index)}
                  />
                ))}
              </div>
              {modalBottomContent}
            </form>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default ListaInstituicoes;