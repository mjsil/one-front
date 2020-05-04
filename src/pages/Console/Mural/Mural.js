import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "../../../components/Dropzone/Dropzone";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import LayoutContext from "../Layout/Layout-context";
import axios from "../../../axios-instance";

import styles from "./Mural.module.css";

class Mural extends Component {
  state = {
    formData: {
      eventName: "",
      eventDescription: "",
    },
    inputtedFile: null,
    completedFilePercent: null,
    hasError: false,
  };

  static contextType = LayoutContext;

  onFormDataChangeHandler = (event) => {
    const inputAttr = event.target.name;
    const inputValue = event.target.value;
    const formData = { ...this.state.formData };
    formData[inputAttr] = inputValue;

    this.setState({ formData: formData });
  };

  setHasErrorState = () => {
    this.setState({ hasError: true });
  };

  onAddNewFileHandler = (newFile) => {
    this.setState({ inputtedFile: newFile });
  };

  onPostMuralHandler = async () => {
    const file = this.state.inputtedFile;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("institutionId", this.context.institution.id);
    formData.append("eventName", this.state.formData.eventName);
    formData.append("eventDescription", this.state.formData.eventDescription);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    await axios.post("/mural/upload", formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      onUploadProgress: this.onUploadProgressHandler,
    });

    this.props.openSnackbar("Sua publicação foi anexada ao mural.");
    this.props.history.replace("/console");
  };

  onUploadProgressHandler = (progressEvent) => {
    let percentComplete = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    this.setState({ ...this.state, completedFilePercent: percentComplete });
  };

  render() {
    let inputtedFileName;
    if (this.state.inputtedFile) {
      inputtedFileName = this.state.inputtedFile.name;
    }

    let inputtedFileProgress;
    if (this.state.completedFilePercent) {
      inputtedFileProgress = ` - ${this.state.completedFilePercent}%`;
    }

    return (
      <div>
        <PrimaryHeading>Adicione um evento</PrimaryHeading>
        <Card className={styles.card}>
          <h2 className={styles.mainHeader}>Novo Evento</h2>
          <div className={styles.inputHolder}>
            <TextField
              label="Título do Evento"
              name="eventName"
              onChange={this.onFormDataChangeHandler}
              variant="outlined"
              className={styles.inputOneLine}
            />
            <TextField
              label="Descrição do Evento"
              name="eventDescription"
              onChange={this.onFormDataChangeHandler}
              variant="outlined"
              rows={4}
              className={styles.inputMultiline}
              multiline
            />
          </div>
          <div className={styles.dropzoneContainer}>
            <h3>Somente serão válidas as extensões .png .pdf .jpg .mp4.</h3>
            <Dropzone
              onAddFile={this.onAddNewFileHandler}
              setHasError={this.setHasErrorState}
              validFilesExtensions={["png", "pdf", "jpg", "mp4"]}
            />
          </div>
          <Button
            className={styles.mainButton}
            disabled={
              (this.state.inputtedFile ? false : true) ||
              this.state.completedFilePercent > 0
            }
            startIcon={<CloudUploadIcon />}
            onClick={this.onPostMuralHandler}
            disableElevation
            color="secondary"
            variant="contained"
          >
            Adicione evento
          </Button>
          <div className={styles.filesNameHolder}>
            {inputtedFileName}
            {inputtedFileProgress}
          </div>
        </Card>
      </div>
    );
  }
}

Mural.propTypes = {
  history: PropTypes.object,
  openSnackbar: PropTypes.func,
};

export default Mural;
