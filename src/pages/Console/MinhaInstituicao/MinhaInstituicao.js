import React, { Component, Fragment } from 'react';

import axios from '../../../axios-instance';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import Input from '../../../components/Form/Input/Input';
import Button from '../../../components/Form/Button/Button';
import ErrorMessage from '../../../components/Form/ErrorMessage/ErrorMessage';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './MinhaInstituicao.module.css';

class MeuPerfil extends Component {
  state = {
    editMode: false,
    institutionData: {},
    formData: {
      name: '',
      email: '',
      oldPassword: '',
      password: ''
    },
    loading: false,
    errorMessage: null
  }

  componentDidMount() {
    const institution = { ...this.props.institution };
    this.setState({ institutionData: institution });
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

    const formData = { ...this.state.formData };
    const newInstitutionData = {};

    for (let key in formData) {
      if (formData[key].trim().length > 0) {
        newInstitutionData[key] = formData[key];
      }
    }

    axios
      .put('/institutions', newInstitutionData)
      .then((res) => {
        const error = res.data.error;
        if (error) {
          return this.setState({ errorMessage: error, loading: false });
        }
        return this.props.changeInstitutionData(res.data);
      })
      .then(() => {
        this.props.openSnackbar('Dados da instituição alterados');
        this.props.history.replace('/console');
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
      <Button disabled={!this.state.editMode}>Editar</Button>
    );

    if (this.state.loading) {
      formBottomContent = <CircularProgress />
    }

    return (
      <Fragment>
        <PrimaryHeading>Minha Instituição</PrimaryHeading>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardToolbar}>
              <Switch checked={this.state.editMode} onChange={this.onChangeEditModeHandler} />
              {editModeMsg}
            </div>
            <main className={styles.cardContent}>
              <form className={styles.cardForm} onSubmit={this.onSubmitNewInstitutionDataHandler}>
                {errorMessage}
                <div>
                  <label>Instituição:</label>
                  <Input
                    placeholder={this.state.institutionData.name}
                    name="name"
                    type="text"
                    disabled={!this.state.editMode}
                    onChange={this.onChangeFormDataHandler} />
                </div>
                <div>
                  <label>E-mail:</label>
                  <Input
                    placeholder={this.state.institutionData.email}
                    name="email"
                    type="email"
                    disabled={!this.state.editMode}
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
                {formBottomContent}
              </form>
            </main>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MeuPerfil;