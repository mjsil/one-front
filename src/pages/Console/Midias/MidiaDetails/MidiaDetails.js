import React, { Component, Fragment } from "react";
import PrimaryHeading from "../../../../components/UI/PrimaryHeading/PrimaryHeading";
import Dropzone from "../../../../components/Dropzone/Dropzone";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import axios from "../../../../axios-instance";

import styles from "./MidiaDetails.module.css";

class MidiaDetails extends Component {
  state = {
    files: [],
    midiaItems: [],
    midiaVideoItems: [],
    newVideoUrl: "",
  };

  componentDidMount() {
    if (!this.props.location.state) {
      return this.props.history.replace("/console");
    }

    const selectedMidiaId = this.props.location.state.midia.id;
    axios.get("/midiaitem/institution/" + selectedMidiaId).then((res) =>
      this.setState({
        midiaItems: res.data.midiaItems,
        midiaVideoItems: res.data.midiaVideoItems,
      })
    );
  }

  onChangeUrlNameHandler = (event) => {
    const inputValue = event.target.value;

    this.setState({ newVideoUrl: inputValue });
  };

  onUploadingVideoLinkHandler = () => {
    const midiaId = this.props.location.state.midia.id;

    axios
      .post("/midiaitem/video", {
        midiaId,
        url: this.state.newVideoUrl,
      })
      .then((res) => {
        const midiaVideoItems = [...this.state.midiaVideoItems];
        midiaVideoItems.push(res.data);

        this.setState({ midiaVideoItems });
        this.props.openSnackbar("Uma nova url de vídeo foi adicionada.");
      });
  };

  onAddingFileHandler = (file) => {
    const updatedFiles = [...this.state.files];
    updatedFiles.push(file);
    this.setState({ files: updatedFiles });
  };

  onUploadingFilesHandler = () => {
    const allFiles = [...this.state.files];

    for (let file of allFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("midiaId", this.props.location.state.midia.id);
      formData.append("timestamp", (Date.now() / 1000) | 0);

      axios
        .post("/midiaitem", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then((res) => {
          const updatedMidiaItems = [...this.state.midiaItems];
          updatedMidiaItems.push(res.data);

          this.setState({ midiaItems: updatedMidiaItems });
        });
    }

    this.setState({ files: [] });
    this.props.openSnackbar("Os itens de mídia foram adicionados.");
  };

  onDeleteLinkHandler = (linkId) => {
    axios.delete("/midia/videoItem/" + linkId).then((res) => {
      this.props.openSnackbar("Link deletado com sucesso.");
    });
  };

  onDeletePhotoHandler = (photoId) => {
    console.log("here1");
    axios.delete("/midia/item/" + photoId).then((res) => {
      console.log("here2");
      this.props.openSnackbar("Arquivo deletado com sucesso.");
    });
  };

  render() {
    let midia;
    if (this.props.location.state) {
      midia = this.props.location.state.midia;
    }

    const inputtedFilesName = this.state.files.map((file, i) => {
      return <p key={i}>{file.name}</p>;
    });

    return (
      <Fragment>
        <PrimaryHeading>{midia.name}</PrimaryHeading>
        <Card className={styles.mainCard}>
          <Box className={styles.infoBar}>Adicionar Vídeo</Box>
          <Box className={styles.mainCardContent}>
            <Box>
              <h3>Link do vídeo:</h3>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={this.state.newVideoUrl}
                onChange={this.onChangeUrlNameHandler}
              />
            </Box>
            <Button
              onClick={this.onUploadingVideoLinkHandler}
              className={styles.button}
              color="secondary"
              startIcon={<CloudUploadIcon />}
              variant="contained"
            >
              Adicionar Link
            </Button>
          </Box>
        </Card>

        <Card className={styles.mainCard}>
          <Box className={styles.infoBar}>Adicionar Imagem</Box>
          <Box className={styles.mainCardContent}>
            <h3>Somente serão válidas as extensões .png .jpg .jpeg.</h3>
            <Dropzone
              onAddFile={this.onAddingFileHandler}
              multiple={true}
              validFilesExtensions={["png", "jpg", "jpeg"]}
            />
            {inputtedFilesName}
            <Button
              onClick={this.onUploadingFilesHandler}
              className={styles.button}
              color="primary"
              startIcon={<CloudUploadIcon />}
              variant="contained"
            >
              Adicionar Imagem
            </Button>
          </Box>
        </Card>

        <Card className={styles.midiasCardContainer}>
          <Box className={styles.linksHolder}>
            <PrimaryHeading>Vídeos Anexados</PrimaryHeading>
            {this.state.midiaVideoItems.map((item) => {
              return (
                <div key={item.id} styles={styles.linkHolder}>
                  <a href={item.url} className={styles.link}>
                    {item.url}
                  </a>
                  <IconButton
                    size="small"
                    onClick={() => this.onDeleteLinkHandler(item.id)}
                  >
                    <HighlightOffIcon color="error" />
                  </IconButton>
                </div>
              );
            })}
          </Box>

          <PrimaryHeading>Imagens Anexadas</PrimaryHeading>
          <Grid container spacing={3}>
            {this.state.midiaItems.map((item) => {
              return (
                <Grid key={item.id} item md={3} xs={6}>
                  <Box className={styles.imageContainer}>
                    <IconButton
                      className={styles.deleteIcon}
                      size="small"
                      onClick={() => this.onDeletePhotoHandler(item.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                    <img
                      src={axios.defaults.baseURL + "/files/" + item.filename}
                      alt="Mídia Item"
                      className={styles.image}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      </Fragment>
    );
  }
}

export default MidiaDetails;
