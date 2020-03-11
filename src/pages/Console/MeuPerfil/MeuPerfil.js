import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import axios from '../../../axios-instance';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import Input from '../../../components/Form/Input/Input';
import Button from '../../../components/Form/Button/Button';
import ErrorMessage from '../../../components/Form/ErrorMessage/ErrorMessage';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import styles from './MeuPerfil.module.css';

class MeuPerfil extends Component {
  state = {
    editMode: false,
    myProfile: {},
    formData: {
      name: '',
      email: '',
      oldPassword: '',
      password: '',
      phone: '',
      birth: '',
      cpf: '',
      city: '',
      cep: '',
      address: '',
      areas_de_interesse: '',
      serial_card: '',
    },
    loading: false,
    errorMessage: null
  }

  componentDidMount() {
    axios
      .get('/user')
      .then((res) => {
        const receivedData = res.data;
        this.setState({
          myProfile: {
            ...receivedData,
            areas_de_interesse: receivedData.areas_de_interesse ? (
              receivedData.areas_de_interesse.join(', ')
            ) : null
          }
        });
      });
  }

  onChangeEditModeHandler = () => {
    this.setState({
      editMode: !this.state.editMode,
      errorMessage: null
    });
  }

  onChangeFormDataHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const formData = { ...this.state.formData };
    formData[inputName] = inputValue;

    this.setState({ formData: formData });
  }

  onSubmitNewInstitutionDataHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = { 
      ...this.state.formData
    };
    
    const newMyProfile = {};

    for (let key in formData) {
      if (formData[key].trim().length > 0) {
        newMyProfile[key] = formData[key];
      }
    }

    if (newMyProfile.areas_de_interesse) {
      newMyProfile.areas_de_interesse = newMyProfile.areas_de_interesse.split(', ');
    }
    
    axios
      .put('/users', newMyProfile)
      .then((res) => {
        const error = res.data.error;
        if (error) {
          return this.setState({ errorMessage: error, loading: false });
        }
        return this.setState({ loading: false });
      })
      .then(() => {
        this.props.history.replace('/console');
        this.props.openSnackbar('Dados do perfil alterados com sucesso');
      })
      .catch(err => {
        if (err.response.data) {
          this.setState({ errorMessage: err.response.data.error })
        }
        this.setState({ loading: false });
      });
  }

  render() {
    let editModeMsg = (
      <p>
        {this.state.editMode ? 'Desabilitar edição' : 'Habilitar edição'}
      </p>
    );

    let errorMessage = null;
    if (this.state.errorMessage) {
      errorMessage = <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
    }

    let formBottomContent = (
      <div className={styles.centered}>
        <Button disabled={!this.state.editMode}>Salvar</Button>
      </div>
    );

    if (this.state.loading) {
      formBottomContent = (
        <div className={styles.centered}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <Fragment>
        <PrimaryHeading>Meu Perfil</PrimaryHeading>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardToolbar}>
              <Switch checked={this.state.editMode} onChange={this.onChangeEditModeHandler} />
              {editModeMsg}
            </div>

            <form className={styles.cardForm} onSubmit={this.onSubmitNewInstitutionDataHandler}>
              <main className={styles.cardContent}>
                <div className={styles.cardContentTop}>
                  <div className={styles.cardContentLeft}>
                    <div className={styles.avatarContainer}>
                      <div className={styles.avatar}>
                        <AccountBalanceIcon className={styles.avatarIcon} fontSize="large" />
                      </div>
                      <button
                        type="button"
                        className={styles.avatarBtn}
                        disabled={!this.state.editMode}
                      >
                        Alterar Foto
                      </button>
                    </div>
                  </div>

                  <div className={styles.cardContentRight}>
                    <div>
                      <label>Nome:</label>
                      <Input
                        placeholder={this.state.myProfile.name}
                        name="name"
                        type="text"
                        disabled={!this.state.editMode}
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                    <div>
                      <label>E-mail:</label>
                      <Input
                        placeholder={this.state.myProfile.email}
                        name="email"
                        type="email"
                        disabled={!this.state.editMode}
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                    <div>
                      <label>Telefone:</label>
                      <Input
                        placeholder={this.state.myProfile.phone}
                        disabled={!this.state.editMode}
                        mask="(99)99999-9999"
                        name="phone"
                        type="tel"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                    <div>
                      <label>CPF:</label>
                      <Input
                        placeholder={this.state.myProfile.cpf}
                        disabled={!this.state.editMode}
                        name="cpf"
                        mask="999.999.999-99"
                        type="text"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                  </div>
                </div>
                <div className={styles.cardContentBottom}>
                  <div className={styles.cardContentLeft}>
                    <div>
                      <label>Nascimento:</label>
                      <Input
                        placeholder={this.state.myProfile.birth}
                        disabled={!this.state.editMode}
                        name="birth"
                        mask="99/99/9999"
                        type="text"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                    <div>
                      <label>Cidade:</label>
                      <Input
                        placeholder={this.state.myProfile.city}
                        disabled={!this.state.editMode}
                        name="city"
                        type="text"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                    <div>
                      <label>CEP:</label>
                      <Input
                        placeholder={this.state.myProfile.cep}
                        disabled={!this.state.editMode}
                        name="cep"
                        mask="99.999-999"
                        type="text"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                    <div>
                      <label>Endereço:</label>
                      <Input
                        placeholder={this.state.myProfile.address}
                        disabled={!this.state.editMode}
                        name="address"
                        type="text"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                  </div>
                  <div className={styles.cardContentRight}>
                    <div>
                      <label>Áreas de interesse:</label>
                      <Input
                        placeholder={this.state.myProfile.areas_de_interesse}
                        disabled={!this.state.editMode}
                        name="areas_de_interesse"
                        type="text"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                    <div>
                      <label>Serial do cartão:</label>
                      <Input
                        disabled={!this.state.editMode}
                        name="serial_card"
                        type="number"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                    <div>
                      <label>Digite sua senha*:</label>
                      <Input
                        disabled={!this.state.editMode}
                        name="oldPassword"
                        type="password"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                    <div>
                      <label>Digite a nova senha (opcional):</label>
                      <Input
                        disabled={!this.state.editMode}
                        name="password"
                        type="password"
                        onChange={this.onChangeFormDataHandler} />
                    </div>
                  </div>
                </div>
                {formBottomContent}
                {errorMessage}
              </main>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

MeuPerfil.propTypes = {
  openSnackbar: PropTypes.func
}

export default MeuPerfil;