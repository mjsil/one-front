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

import styles from "./Propaganda.module.css";

class Propaganda extends Component {
  state = {
    formData: {
      name: "",
      description: "",
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

    if (inputValue.length <= 255) {
      this.setState({ formData: formData });
    }
  };

  setHasErrorState = () => {
    this.setState({ hasError: true });
  };

  onAddNewFileHandler = (newFile) => {
    this.setState({ inputtedFile: newFile });
  };

  onPostPropagandaHandler = async () => {
    const file = this.state.inputtedFile;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("institutionId", this.context.institution.id);
    formData.append("name", this.state.formData.name);
    formData.append("description", this.state.formData.description);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    await axios.post("/propaganda/upload", formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      onUploadProgress: this.onUploadProgressHandler,
    });

    this.props.openSnackbar(
      "Sua publicação foi anexada às propagandas do seu app."
    );
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

    const nameLength = this.state.formData.name.length;
    const descriptionLength = this.state.formData.description.length;

    return (
      <div>
        <PrimaryHeading>Adicione uma propaganda</PrimaryHeading>
        <Card className={styles.card}>
          <h2 className={styles.mainHeader}>Nova Propaganda</h2>

          <p className={styles.warningParagraph}>
            <span className={styles.obsText}>OBS:</span> os campos de texto
            estão limitados a 255 caracteres.
          </p>
          <div className={styles.inputHolder}>
            <TextField
              label="Título da Propaganda"
              name="name"
              value={this.state.formData.name}
              onChange={this.onFormDataChangeHandler}
              variant="outlined"
              className={styles.inputOneLine}
            />
            {nameLength} / 255
          </div>
          <div className={styles.inputHolder}>
            <TextField
              label="Descrição da Propaganda"
              name="description"
              value={this.state.formData.description}
              onChange={this.onFormDataChangeHandler}
              variant="outlined"
              rows={4}
              className={styles.inputMultiline}
              multiline
            />
            {descriptionLength} / 255
          </div>

          <div className={styles.dropzoneContainer}>
            <h3>Somente serão válidas as extensões .png .pdf .jpg .mp4.</h3>
            <Dropzone
              onAddFile={this.onAddNewFileHandler}
              setHasError={this.setHasErrorState}
              validFilesExtensions={["png", "pdf", "jpg", "mp4"]}
              multiple={false}
            />
          </div>
          <Button
            className={styles.mainButton}
            disabled={
              (this.state.inputtedFile ? false : true) ||
              this.state.completedFilePercent > 0
            }
            startIcon={<CloudUploadIcon />}
            onClick={this.onPostPropagandaHandler}
            disableElevation
            color="secondary"
            variant="contained"
          >
            Adicione propaganda
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

Propaganda.propTypes = {
  history: PropTypes.object,
  openSnackbar: PropTypes.func,
};

export default Propaganda;
