import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import LayoutContext from '../Layout/Layout-context';
import axios from '../../../axios-instance';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from '../../../components/Form/ErrorMessage/ErrorMessage';
import Button from '../../../components/Form/Button/Button';
import styles from './MensagemInstitucional.module.css';

class MensagemInstitucional extends Component {
  state = {
    institutionData: {},
    formData: {
      message: ''
    },
    errorMessage: null,
    loading: false
  }

  static contextType = LayoutContext;

  componentDidMount() {
    const institution = { ...this.context.institution };
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

    if (formData.message.trim().length < 4) {
      return this.setState({
        errorMessage: 'A mensagem deve conter pelo menos 4 carácteres.',
        loading: false
      });
    }

    if (formData.message.trim().length > 138) {
      return this.setState({
        errorMessage: `
          A mensagem deve conter no máximo 138 caracteres. 
          Caracteres atuais: ${formData.message.trim().length}
        `,
        loading: false
      });
    }
    const dataToPost = {
      mensagem: formData.message
    };

    axios
    .post('/notificacao', dataToPost)
    .then((res) => {
        const error = res.data.error;
        if (error) {
          return this.setState({ errorMessage: error, loading: false });
        }
        
        return this.context.changeInstitutionData(res.data);
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

    let errorMessage = null;
    if (this.state.errorMessage) {
      errorMessage = (
        <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
      );
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
              {errorMessage}
              <form className={styles.form} onSubmit={this.onSubmitFormHandler}>
                <TextField
                  id='outlined-multiline-static'
                  className={styles.messageInput}
                  name='message'
                  onChange={this.onChangeFormDataHandler}
                  label='Mensagem'
                  multiline
                  rows={4}
                  variant='outlined'
                />
                {formBottomContent}
              </form>
            </main>
          </div>
        </div>
      </Fragment>
    );
  }
}

MensagemInstitucional.propTypes = {
  institution: PropTypes.object,
  changeInstitutionData: PropTypes.func,
  openSnackbar: PropTypes.func
}

export default MensagemInstitucional;