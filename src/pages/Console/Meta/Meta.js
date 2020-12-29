import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LayoutContext from '../Layout/Layout-context';
import ListaMetas from './ListaMetas/ListaMetas';
import { api } from '../../../services/oneelevadores';

import styles from './Meta.module.css';

class Meta extends Component {
  state = {
    formData: {
      eventQuantidade: '',
      eventValor: '',
    },
    tokenSession: '',
    hasError: false,
  };

  static contextType = LayoutContext;

  componentDidMount() {
    const getToken = localStorage.getItem('loginToken');

    if (getToken) {
      this.setState({ tokenSession: getToken });
    }
  }

  onFormDataChangeHandler = (event) => {
    const inputAttr = event.target.name;
    const inputValue = event.target.value;
    const formData = { ...this.state.formData };
    formData[inputAttr] = inputValue;

    if (inputValue.length <= 255) {
      this.setState({ formData: formData });
    }
  };

  setHasErrorState = () => {
    this.setState({ hasError: true });
  };

  // onAddNewFileHandler = (newFile) => {
  //   this.setState({ inputtedFile: newFile });
  // };

  onPostMetaHandler = async () => {
    const { tokenSession, formData } = this.state;

    try {
      await api.post(
        '/goal',
        {
          qtd_contratos: formData.eventQuantidade,
          meta_valor: formData.eventValor,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenSession}`,
          },
        }
      );

      this.props.openSnackbar('Meta criada com sucesso.');
      this.props.history.replace('/console');
    } catch (err) {
      console.log('erro: ', err);
      this.props.openSnackbar('Algo deu errado! Tente novamente!');
    }
  };

  // onUploadProgressHandler = (progressEvent) => {
  //   let percentComplete = Math.round(
  //     (progressEvent.loaded * 100) / progressEvent.total
  //   );
  //   this.setState({ ...this.state, completedFilePercent: percentComplete });
  // };

  render() {
    // let inputtedFileName;
    // if (this.state.inputtedFile) {
    //   inputtedFileName = this.state.inputtedFile.name;
    // }

    // let inputtedFileProgress;
    // if (this.state.completedFilePercent) {
    //   inputtedFileProgress = ` - ${this.state.completedFilePercent}%`;
    // }

    // const eventNameLength = this.state.formData.eventName.length;
    // const eventDescriptionLength = this.state.formData.eventDescription.length;

    return (
      <div>
        <PrimaryHeading>Adicione as metas</PrimaryHeading>
        <Card className={styles.card}>
          <h2 className={styles.mainHeader}>Meta Semestral</h2>

          {/* <p className={styles.warningParagraph}>
            <span className={styles.obsText}>OBS:</span> os campos estão
            limitados a 255 caracteres.
          </p> */}
          <div className={styles.inputHolder}>
            <TextField
              label="Quantidade de contratos"
              name="eventQuantidade"
              value={this.state.formData.eventQuantidade}
              onChange={this.onFormDataChangeHandler}
              variant="outlined"
              className={styles.inputOneLine}
            />
            {/* {eventNameLength} / 255 */}
          </div>
          <div className={styles.inputHolder}>
            <TextField
              label="Valor da meta"
              name="eventValor"
              value={this.state.formData.eventValor}
              onChange={this.onFormDataChangeHandler}
              variant="outlined"
              className={styles.inputOneLine}
            />
            {/* {eventNameLength} / 255 */}
          </div>
          {/* <div className={styles.inputHolder}>
            <TextField
              label="Descrição do Evento"
              name="eventDescription"
              value={this.state.formData.eventDescription}
              onChange={this.onFormDataChangeHandler}
              variant="outlined"
              rows={4}
              className={styles.inputMultiline}
              multiline
            />
            {eventDescriptionLength} / 255
          </div> */}
          {/* 
          <div className={styles.dropzoneContainer}>
            <h3>Somente serão válidas as extensões .png .pdf .jpg .mp4.</h3>
            <Dropzone
              onAddFile={this.onAddNewFileHandler}
              setHasError={this.setHasErrorState}
              validFilesExtensions={['png', 'pdf', 'jpg', 'mp4']}
              multiple={false}
            />
          </div> */}
          <Button
            className={styles.mainButton}
            disabled={
              !this.state.formData.eventQuantidade ||
              !this.state.formData.eventValor
            }
            startIcon={<CloudUploadIcon />}
            onClick={this.onPostMetaHandler}
            disableElevation
            color="secondary"
            variant="contained"
          >
            Adicione evento
          </Button>
          {/* <div className={styles.filesNameHolder}>
            {inputtedFileName}
            {inputtedFileProgress}
          </div> */}
        </Card>
        <ListaMetas institutionId={this.context.institution.id} />
      </div>
    );
  }
}

Meta.propTypes = {
  history: PropTypes.object,
  openSnackbar: PropTypes.func,
};

export default Meta;
