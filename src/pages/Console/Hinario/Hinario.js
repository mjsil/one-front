import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import LayoutContext from "../Layout/Layout-context";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import Button from "../../../components/Form/Button/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import { Formik } from "formik";
import axios from "../../../axios-instance";

import styles from "./Hinario.module.css";

class Hinario extends Component {
  state = {
    isLoading: false,
    caughtError: null,
  };

  static contextType = LayoutContext;

  changeInstitutionBibleHandler = (formData) => {
    this.setState({ isLoading: true, caughtError: null });

    axios
      .put("/institutions", formData)
      .then((res) => {
        this.context.changeInstitutionData(res.data);

        this.props.openSnackbar("Link atualizado com sucesso");
        this.props.history.replace("/console");
      })
      .catch((err) => {
        if (err.response.data) {
          this.setState({ caughtError: err.response.data.error });
        }
        this.setState({ isLoading: false });
      });
  };

  render() {
    let currentLink = (
      <Typography color="error">Nenhum link adicionado</Typography>
    );
    if (this.context.institution.hinario) {
      currentLink = (
        <Box className={styles.linkContainer}>
          <Typography component="label" className={styles.inputLabel}>
            Link atual:
          </Typography>
          <Typography
            component="a"
            href={this.context.institution.hinario}
            target="_blank"
          >
            {this.context.institution.hinario}
          </Typography>
        </Box>
      );
    }

    let progressBar;
    if (this.state.isLoading) {
      progressBar = <LinearProgress />;
    }

    let errorMessage;
    if (this.state.caughtError) {
      errorMessage = <Alert severity="error">{this.state.caughtError}</Alert>;
    }

    return (
      <Formik
        initialValues={{
          hinario: "",
          oldPassword: "",
        }}
        onSubmit={(values) => this.changeInstitutionBibleHandler(values)}
      >
        {(formikProps) => (
          <Fragment>
            <PrimaryHeading>Hinário</PrimaryHeading>

            <Box className={styles.container}>
              <Card className={styles.formContainer}>
                <Box className={styles.infoBar}>Adicionar Link</Box>
                <Box className={styles.formContent}>
                  {currentLink}
                  <Divider className={styles.divider} />
                  <Box className={styles.newLinkGroup}>
                    <Typography component="label" className={styles.inputLabel}>
                      Novo Link:
                    </Typography>
                    <TextField
                      margin="dense"
                      fullWidth
                      variant="outlined"
                      value={formikProps.values.hinario}
                      onChange={formikProps.handleChange("hinario")}
                    />
                  </Box>
                  <Box>
                    <Typography component="label" className={styles.inputLabel}>
                      Digite sua senha:
                    </Typography>
                    <TextField
                      margin="dense"
                      fullWidth
                      variant="outlined"
                      type="password"
                      value={formikProps.values.oldPassword}
                      onChange={formikProps.handleChange("oldPassword")}
                    />
                  </Box>
                  <Button
                    type="submit"
                    disabled={this.state.isLoading}
                    onClick={formikProps.handleSubmit}
                  >
                    Adicionar Link
                  </Button>
                </Box>
                {progressBar}
                {errorMessage}
              </Card>
            </Box>
          </Fragment>
        )}
      </Formik>
    );
  }
}

Hinario.propTypes = {
  openSnackbar: PropTypes.func,
  history: PropTypes.object,
};

export default Hinario;
