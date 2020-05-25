import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import LayoutContext from "../../Console/Layout/Layout-context";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import Input from "../../../components/Form/Input/Input";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import axios from "../../../axios-instance";

import styles from "./Localizacao.module.css";

class Localizacao extends Component {
  state = {
    institutionData: {},
    formData: {
      latitude: "",
      logitude: "",
      oldPassword: "",
      password: "",
    },
    loading: false,
    errorMessage: null,
  };

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
  };

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
      .put("/institutions", newInstitutionData)
      .then((res) => {
        const error = res.data.error;
        if (error) {
          return this.setState({ errorMessage: error, loading: false });
        }
        return this.context.changeInstitutionData(res.data);
      })
      .then(() => {
        this.props.openSnackbar("Dados da instituição alterados");
        this.props.history.replace("/console");
      })
      .catch((err) => {
        if (err.response.data) {
          this.setState({ errorMessage: err.response.data.error });
        }
        this.setState({ loading: false });
      });
  };

  render() {
    let errorMessage = null;
    if (this.state.errorMessage) {
      errorMessage = (
        <Alert severity="error" className={styles.errorAlert}>
          {this.state.errorMessage}
        </Alert>
      );
    }

    let formBottomContent = (
      <Button
        disabled={this.state.loading}
        variant="contained"
        color="primary"
        className={styles.button}
        type="submit"
      >
        Salvar Alterações
      </Button>
    );
    if (this.state.loading) {
      formBottomContent = <CircularProgress />;
    }

    return (
      <Fragment>
        <PrimaryHeading>Minha Instituição</PrimaryHeading>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardToolbar}>Dados Localicação</div>
            <main className={styles.cardContent}>
              <form
                className={styles.cardForm}
                onSubmit={this.onSubmitNewInstitutionDataHandler}
              >
                {errorMessage}
                <div>
                  <label>Latitude:</label>
                  <Input
                    placeholder={this.state.institutionData.latitude}
                    name="latitude"
                    type="text"
                    onChange={this.onChangeFormDataHandler}
                  />
                </div>
                <div>
                  <label>Longitude:</label>
                  <Input
                    placeholder={this.state.institutionData.longitude}
                    name="longitude"
                    type="text"
                    onChange={this.onChangeFormDataHandler}
                  />
                </div>
                <div>
                  <label>Digite sua senha*:</label>
                  <Input
                    name="oldPassword"
                    type="password"
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

Localizacao.propTypes = {
  institution: PropTypes.object,
  changeInstitutionData: PropTypes.func,
  openSnackbar: PropTypes.func,
};

export default Localizacao;
