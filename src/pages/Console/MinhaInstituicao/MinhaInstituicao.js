import React, { Component, Fragment, createRef } from "react";
import PropTypes from "prop-types";

import LayoutContext from "../../Console/Layout/Layout-context";
import axios from "../../../axios-instance";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import Input from "../../../components/Form/Input/Input";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Switch from "@material-ui/core/Switch";
import ButtonUI from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import styles from "./MinhaInstituicao.module.css";

class MeuPerfil extends Component {
  constructor(props) {
    super(props);
    this.fileInput = createRef();
  }

  state = {
    editMode: false,
    institutionData: {},
    formData: {
      name: "",
      email: "",
      oldPassword: "",
      password: "",
    },
    newLogoFile: null,
    loading: false,
    errorMessage: null,
  };

  static contextType = LayoutContext;

  componentDidMount() {
    const institution = { ...this.context.institution };
    this.setState({ institutionData: institution });
  }

  onChangeEditModeHandler = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  onChangeLogoHandler = (event) => {
    const file = event.target.files[0];
    this.setState({ newLogoFile: file });
  };

  onSubmitNewLogoHandler = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const file = this.state.newLogoFile;
    if (!file) {
      return this.setState({
        errorMessage: "É necessário selecionar um arquivo.",
      });
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    await axios.post("/avatar", formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });

    this.setState({ loading: false });
    window.location.reload(false);
  };

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
    let editModeMsg = (
      <p>{this.state.editMode ? "Desabilitar edição" : "Habilitar edição"}</p>
    );

    let errorMessage = null;
    if (this.state.errorMessage) {
      errorMessage = (
        <Alert severity="error" className={styles.errorAlert}>
          {this.state.errorMessage}
        </Alert>
      );
    }

    let linearProgress = null;

    if (this.state.loading) {
      linearProgress = <LinearProgress />;
    }

    const logoName = this.state.newLogoFile
      ? this.state.newLogoFile.name
      : null;

    return (
      <Fragment>
        <PrimaryHeading>Perfil</PrimaryHeading>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardToolbar}>
              <Switch
                checked={this.state.editMode}
                onChange={this.onChangeEditModeHandler}
              />
              {editModeMsg}
            </div>
            {errorMessage}
            <main className={styles.cardContent}>
              <div className={styles.chooseImageHolder}>
                <ButtonUI
                  onClick={() => this.fileInput.current.click()}
                  disabled={!this.state.editMode || this.state.loading}
                >
                  Selecionar imagem
                </ButtonUI>
                <form
                  onSubmit={this.onSubmitNewLogoHandler}
                  className={styles.chooseImageForm}
                >
                  <input
                    className={styles.chooseImageInput}
                    ref={this.fileInput}
                    type="file"
                    name="logoinput"
                    title={null}
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={this.onChangeLogoHandler}
                  />
                  <ButtonUI
                    variant="contained"
                    disabled={!this.state.editMode || this.state.loading}
                    color="secondary"
                    fullWidth
                    type="submit"
                  >
                    Alterar Logo
                  </ButtonUI>
                </form>
                <p>{logoName}</p>
              </div>
              <form
                className={styles.cardForm}
                onSubmit={this.onSubmitNewInstitutionDataHandler}
              >
                <div>
                  <label>Instituição:</label>
                  <Input
                    placeholder={this.state.institutionData.name}
                    name="name"
                    type="text"
                    disabled={!this.state.editMode}
                    onChange={this.onChangeFormDataHandler}
                  />
                </div>
                <div>
                  <label>E-mail:</label>
                  <Input
                    placeholder={this.state.institutionData.email}
                    name="email"
                    type="email"
                    disabled={!this.state.editMode}
                    onChange={this.onChangeFormDataHandler}
                  />
                </div>
                <div>
                  <label>Digite sua senha*:</label>
                  <Input
                    disabled={!this.state.editMode}
                    name="oldPassword"
                    type="password"
                    onChange={this.onChangeFormDataHandler}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!this.state.editMode || this.state.loading}
                  onClick={this.onSubmitNewInstitutionDataHandler}
                >
                  Salvar Alterações
                </Button>
              </form>
            </main>
            {linearProgress}
          </div>
        </div>
      </Fragment>
    );
  }
}

MeuPerfil.propTypes = {
  institution: PropTypes.object,
  changeInstitutionData: PropTypes.func,
  openSnackbar: PropTypes.func,
};

export default MeuPerfil;
