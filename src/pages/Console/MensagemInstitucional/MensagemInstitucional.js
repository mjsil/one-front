import React, { Component, Fragment } from 'react';

import axios from '../../../axios-instance';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Input from '../../../components/Form/Input/Input';
import Button from '../../../components/Form/Button/Button';
import styles from './MensagemInstitucional.module.css';

class MensagemInstitucional extends Component {
  state = {
    institutionData: {},
    formData: {
      message: '',
      password: ''
    },
    errorMessage: '',
    loading: false
  }

  componentDidMount() {
    const institution = { ...this.props.institution };
    this.setState({ institutionData: institution });
  }

  onChangeFormDataHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const formData = { ...this.state.formData };
    formData[inputName] = inputValue;

    this.setState({ formData: formData });
  }

  onSubmitFormHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = { ...this.state.formData };

    const dataToPut = {
      ...this.state.institutionData,
      institutional_message: formData.message,
      oldPassword: formData.password
    };
    
    axios
      .put('/institutions', dataToPut)
      .then((res) => {
        const error = res.data.error;
        if (error) {
          return this.setState({ errorMessage: error, loading: false });
        }

        const newInstitutionData = { ...res.data };
        return this.props.changeInstitutionData(newInstitutionData);
      })
      .then(() => {
        this.props.openSnackbar('Mensagem institucional adicionada');
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
    let formBottomContent = (
      <Button type='submit'>Adicionar </Button>
    );
    if (this.state.loading) {
      formBottomContent = <LinearProgress />
    }

    return (
      <Fragment>
        <PrimaryHeading>Mensagem Institucional</PrimaryHeading>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.infoBar}>
              Adicione sua mensagem
            </div>
            <main className={styles.boxMainContent}>
              <form className={styles.form} onSubmit={this.onSubmitFormHandler}>
                <TextField
                  id='outlined-multiline-static'
                  className={styles.messageInput}
                  name='message'
                  onChange={this.onChangeFormDataHandler}
                  label='Mensagem'
                  multiline
                  rows='4'
                  variant='outlined'
                />
                <h3 className={styles.alertHeading}>
                  É necessário informar sua senha
                </h3>
                <div className={styles.passwordGroup}>
                  <label>Password</label>
                  <Input
                    label='Password'
                    type='password'
                    name='password'
                    variant='outlined'
                    onChange={this.onChangeFormDataHandler}
                  />
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

export default MensagemInstitucional;