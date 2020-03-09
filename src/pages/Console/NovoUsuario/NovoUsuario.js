import React, { Component, Fragment } from 'react';

import axios from '../../../axios-instance';
import InputGroup from '../../../components/Form/Group/InputGroup/InputGroup';
import ErrorMessage from '../../../components/Form/ErrorMessage/ErrorMessage';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './NovoUsuario.module.css';

class NovoUsuario extends Component {
  state = {
    institutionId: null,
    formData: {
      name: '',
      email: '',
      password: '',
      phone: 0,
      cpf: 0,
      city: '',
      birth: '',
      cep: 0,
      address: ''
    },
    errorMessage: null,
    loading: false
  }

  componentDidMount() {
    const institutionData = { ...this.props.institution };
    this.setState({ institutionId: institutionData.id });
  }

  onChangeFormDataHandler = (event) => {
    event.preventDefault();
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const formData = { ...this.state.formData };
    
    formData[inputName] = inputValue;

    this.setState({ formData: formData });
  }

  onPostNewUserHandler = () => {
    this.setState({ loading: true });

    const formData = { ...this.state.formData };
    
    const dataToPut = {
      ...formData,
      id_instituicao: this.state.institutionId
    };

    axios
      .post('/users', dataToPut)
      .then((res) => {
        const error = res.data.error;
        if (error) {
          return this.setState({ errorMessage: error, loading: false });
        }
        return this.setState({ loading: false });
      })
      .then(() => {
        this.props.history.replace('/console');
        this.props.openSnackbar('Usuário cadastrado com sucesso.');
      })
      .catch(err => {
        if (err.response.data) {
          this.setState({ errorMessage: err.response.data.error })
        }
        this.setState({ loading: false });
      });
  }

  render() {
    let bottomContent = (
      <button
        className={styles.formBtn}
        onClick={this.onPostNewUserHandler}>
        Novo Usuário
      </button>
    );

    if (this.state.loading) {
      bottomContent = <CircularProgress className={styles.linearProgress} />
    }

    let errorMessage = null;

    if (this.state.errorMessage) {
      errorMessage = <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
    }

    return (
      <Fragment>
        <PrimaryHeading>Novo Usuário</PrimaryHeading>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.boxBar}>
              <p>Adicione um novo usuário</p>
            </div>
            <div className={styles.form}>
              <div className={styles.formLeft}>
                <InputGroup
                  label="Nome"
                  inputName="name"
                  inputType="text"
                  inputOnChange={this.onChangeFormDataHandler} />
                <InputGroup
                  label="E-mail"
                  inputName="email"
                  inputType="email"
                  inputOnChange={this.onChangeFormDataHandler} />
                <InputGroup
                  label="Senha"
                  inputName="password"
                  inputType="password"
                  inputOnChange={this.onChangeFormDataHandler} />
                <InputGroup
                  label="Telefone"
                  inputName="phone"
                  inputType="number"
                  inputOnChange={this.onChangeFormDataHandler} />
                <InputGroup
                  label="CPF"
                  inputName="cpf"
                  inputType="number"
                  inputOnChange={this.onChangeFormDataHandler} />
              </div>
              <div className={styles.formRight}>
                <InputGroup
                  label="Cidade"
                  inputName="city"
                  inputType="text"
                  inputOnChange={this.onChangeFormDataHandler} />
                <InputGroup
                  label="Nascimento"
                  inputName="birth"
                  inputType="text"
                  inputOnChange={this.onChangeFormDataHandler} />
                <InputGroup
                  label="CEP"
                  inputName="cep"
                  inputType="number"
                  inputOnChange={this.onChangeFormDataHandler} />
                <InputGroup
                  label="Endereço"
                  inputName="address"
                  inputType="text"
                  inputOnChange={this.onChangeFormDataHandler} />
              </div>
            </div>
            {errorMessage}
            {bottomContent}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NovoUsuario;