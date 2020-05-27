import React, { Component, Fragment } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import ButtonUI from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteSweep";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import Button from "../../../components/Form/Button/Button";
import axios from "../../../axios-instance";
import { Link } from "react-router-dom";

import styles from "./Midias.module.css";

class Midias extends Component {
  state = {
    newMidiaName: "",
    midias: [],
    errorMessage: null,
    isLoading: false,
  };

  componentDidMount() {
    axios.get("/midias").then((res) => {
      this.setState({ midias: res.data });
    });
  }

  onChangeNewMidiaNameHandler = (event) => {
    const eventValue = event.target.value;

    this.setState({ newMidiaName: eventValue });
  };

  onAddingMediaHandler = () => {
    this.setState({ isLoading: true, errorMessage: null });

    const newMidiaName = this.state.newMidiaName;
    if (!newMidiaName.trim().length) {
      return this.setState({
        errorMessage: "É necessário preencher o nome do álbum.",
        isLoading: false,
      });
    }

    if (newMidiaName.trim().length > 20) {
      return this.setState({
        errorMessage: "O nome do álbum não deve conter mais de 20 caracteres.",
        isLoading: false,
      });
    }

    axios.post("/midia", { midiaName: newMidiaName }).then((res) => {
      const updatedMidias = [...this.state.midias];
      updatedMidias.push(res.data);

      this.setState({ midias: updatedMidias, isLoading: false });
      this.props.openSnackbar("Um novo álbum foi adicionado.");
    });
  };

  onDeletingMediaHandler = (mediaId) => {
    axios.delete("/midia/" + mediaId).then((res) => {
      const midias = [...this.state.midias];
      const updatedMidias = midias.filter(
        (midia) => midia.id !== res.data.deletedMidiaId
      );

      this.setState({ midias: updatedMidias });
    });
  };

  render() {
    let linearProgress;
    if (this.state.isLoading) {
      linearProgress = <LinearProgress />;
    }

    let errorAlert;
    if (this.state.errorMessage) {
      errorAlert = <Alert severity="error">{this.state.errorMessage}</Alert>;
    }

    return (
      <Fragment>
        <PrimaryHeading>Mídias</PrimaryHeading>
        <Box className={styles.formContainer}>
          <Card className={styles.formCard}>
            <Box className={styles.infoBar}>Adicionar novo álbum</Box>
            <Box className={styles.formContent}>
              <Typography component="label" className={styles.inputLabel}>
                Nome do álbum:
              </Typography>
              <TextField
                margin="dense"
                fullWidth
                variant="outlined"
                value={this.state.newMidiaName}
                onChange={this.onChangeNewMidiaNameHandler}
              />
              <Button
                onClick={this.onAddingMediaHandler}
                disabled={this.state.isLoading}
              >
                Adicionar
              </Button>
              {errorAlert}
              {linearProgress}
            </Box>
          </Card>
        </Box>
        <Box>
          <PrimaryHeading>Lista de Álbuns</PrimaryHeading>
          <Grid container spacing={3}>
            {this.state.midias.map((midia) => {
              return (
                <Grid key={midia.id} item xs={6} md={3}>
                  <Card className={styles.gridCard}>
                    <IconButton
                      className={styles.deleteIcon}
                      size="small"
                      onClick={() => this.onDeletingMediaHandler(midia.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                    {midia.name}
                    <ButtonUI
                      color="primary"
                      component={Link}
                      to={{
                        pathname: "/console/midias/resumo",
                        state: { midia },
                      }}
                    >
                      Editar
                    </ButtonUI>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Fragment>
    );
  }
}

export default Midias;
