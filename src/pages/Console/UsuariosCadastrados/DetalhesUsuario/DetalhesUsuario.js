import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import PrimaryHeading from "../../../../components/UI/PrimaryHeading/PrimaryHeading";
import InputGroup from "../../../../components/Form/Group/InputGroup/InputGroup";
import SelectGroup from "../../../../components/Form/Group/SelectGroup/SelectGroup";
import TransferList from "../../../../components/UI/TransferList/TransferList";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import LayoutContext from "../../Layout/Layout-context";
import axios from "../../../../axios-instance";
import * as yup from "yup";

import styles from "./DetalhesUsuario.module.css";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("É necessário preencher o seu nome.")
    .min(3, "Preencha seu nome completo."),
  email: yup
    .string()
    .required("É necessário preencher o seu e-mail.")
    .email("Preencha um e-mail válido."),
  cpf: yup
    .string()
    .required("É necessário preencher o seu CPF.")
    .min(14, "Preencha um CPF válido."),
  phone: yup
    .string()
    .required("É necessário preencher o seu telefone.")
    .min(14, "Preencha um número válido de telefone."),
  cep: yup
    .string()
    .required("É necessário preencher o seu CEP.")
    .min(10, "Preencha um CEP válido."),
});

const enumValue = (name) => Object.freeze({ toString: () => name });

const TIPO_PROFISSIONAL = Object.freeze({
  NADA_SELECIONADO: enumValue(""),
  CONSTRUCAO_CIVIL: enumValue("CONSTRUCAO_CIVIL"),
  CADEIA_PRODUTIVA: enumValue("CADEIA_PRODUTIVA"),
  SETOR_CONSTRUCAO: enumValue("SETOR_CONSTRUCAO"),
  PROJETISTA: enumValue("PROJETISTA"),
  ACADEMICO: enumValue("ACADEMICO"),
  IMPRENSA: enumValue("IMPRENSA"),
});

class DetalhesUsuario extends Component {
  state = {
    user: {},
    newUserData: {},
    leftTransferList: [
      "RESPONSABILIDADE_SOCIAL",
      "INOVACAO",
      "INTERESSE_SOCIAL",
      "INFRAESTRUTURA",
      "JURIDICO",
      "INDUSTRIA_IMOBILIARIA",
      "SUSTENTABILIDADE",
      "RELACOES_TRABALHISTAS",
      "OBRAS_INDUSTRIAIS",
      "SERVICOS_CBIC",
    ],
    selectedTipoProfissionalIndex: 0,
    errorMessage: "",
    isLoading: false,
    rightTransferList: [],
  };

  componentDidMount() {
    if (!this.props.location.state) {
      return this.props.history.replace("/console");
    }

    const selectedUserData = this.props.location.state;
    this.setState({
      user: selectedUserData,
      newUserData: selectedUserData,
    });
  }

  static contextType = LayoutContext;

  setLeftTransferListHandler = (values) => {
    this.setState({ leftTransferList: values });
  };

  setRightTransferListHandler = (values) => {
    this.setState({ rightTransferList: values });
  };

  onDeleteUserHandler = () => {
    axios
      .delete("/users/" + this.state.user.id)
      .then(() => {
        this.props.openSnackbar("Os dados do usuário foram alterados.");
        this.props.history.replace("/console");
      })
      .catch((err) => {
        if (err.response.data) {
          alert(err.response.data.error);
        }
        this.setState({ isLoading: false });
      });
  };

  onChangeUserData = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    const newUserData = { ...this.state.newUserData };
    newUserData[eventName] = eventValue;

    this.setState({ newUserData: newUserData });
  };

  onChangeSelectElement = (event) => {
    const selectedIndex = event.target.value;
    this.setState({ selectedTipoProfissionalIndex: parseInt(selectedIndex) });
  };

  onFormSubmittedHandler = () => {
    this.setState({ isLoading: true, errorMessage: "" });

    const tipo_profissional = this.getTipoProfissionalString();
    const areas_de_interesse = this.state.rightTransferList;
    const { name, email, phone, birth, cpf, city, cep, address } = {
      ...this.state.newUserData,
    };
    const dataToPut = {
      name,
      email,
      phone,
      birth,
      cpf,
      city,
      cep,
      address,
      tipo_profissional,
      areas_de_interesse,
    };

    if (this.context.institution.type === 1) {
      if (!tipo_profissional.trim().length) {
        return this.setState({
          errorMessage: "Selecione o tipo profissional do usuário.",
          isLoading: false,
        });
      }

      if (!areas_de_interesse.length) {
        return this.setState({
          errorMessage:
            "É necessário selecionar ao menos uma área de interesse.",
          isLoading: false,
        });
      }
    }

    formSchema.isValid(dataToPut).then((isValid) => {
      if (!isValid) {
        return this.setState({
          errorMessage:
            "Confira os campos obrigatórios e digite valores válidos.",
          isLoading: false,
        });
      }

      axios
        .patch("/users/update-by-institution/" + this.state.user.id, dataToPut)
        .then(() => {
          this.props.openSnackbar("Os dados do usuário foram alterados.");
          this.props.history.replace("/console");
        })
        .catch((err) => {
          if (err.response.data) {
            this.setState({ errorMessage: err.response.data.error });
          }
          this.setState({ isLoading: false });
        });
    });
  };

  getTipoProfissionalString() {
    const selectedTipoProfissionalIndex = this.state
      .selectedTipoProfissionalIndex;
    const tipoProfissionalKeys = Object.keys(TIPO_PROFISSIONAL);
    const selectedTipoProfissional =
      TIPO_PROFISSIONAL[tipoProfissionalKeys[selectedTipoProfissionalIndex]];

    return selectedTipoProfissional.toString();
  }

  render() {
    const { user, newUserData } = this.state;

    let errorBox;
    if (this.state.errorMessage) {
      errorBox = <Alert severity="error">{this.state.errorMessage}</Alert>;
    }

    let linearProgress;
    if (this.state.isLoading) {
      linearProgress = <LinearProgress />;
    }

    let renderedTipoProfissional;
    let renderedAreasDeInteresse;
    if (this.context.institution.type === 1) {
      renderedTipoProfissional = (
        <Fragment>
          <Grid item md={6} xs={12}>
            <SelectGroup
              label="Tipo Profissional*"
              selectName="tipo_profissional"
              selectOnChange={this.onChangeSelectElement}
              selectValue={this.state.selectedTipoProfissionalIndex}
            >
              <option value={0}>
                {TIPO_PROFISSIONAL.NADA_SELECIONADO.toString()}
              </option>
              <option value={1}>
                {TIPO_PROFISSIONAL.CONSTRUCAO_CIVIL.toString()}
              </option>
              <option value={2}>
                {TIPO_PROFISSIONAL.CADEIA_PRODUTIVA.toString()}
              </option>
              <option value={3}>
                {TIPO_PROFISSIONAL.SETOR_CONSTRUCAO.toString()}
              </option>
              <option value={4}>
                {TIPO_PROFISSIONAL.PROJETISTA.toString()}
              </option>
              <option value={5}>
                {TIPO_PROFISSIONAL.ACADEMICO.toString()}
              </option>
              <option value={6}>{TIPO_PROFISSIONAL.IMPRENSA.toString()}</option>
            </SelectGroup>
          </Grid>
        </Fragment>
      );

      renderedAreasDeInteresse = (
        <Fragment>
          <Typography variant="subtitle1" align="center">
            Selecione as áreas de interesse*
          </Typography>
          <TransferList
            left={this.state.leftTransferList}
            right={this.state.rightTransferList}
            setLeft={this.setLeftTransferListHandler}
            setRight={this.setRightTransferListHandler}
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <PrimaryHeading>Detalhes Usuário</PrimaryHeading>
        <Box className={styles.usernameHolder}>
          <Typography variant="h5">{user.name}</Typography>
          <IconButton onClick={this.onDeleteUserHandler}>
            <Tooltip title="Deletar Usuário">
              <DeleteIcon color="error" />
            </Tooltip>
          </IconButton>
        </Box>
        <Divider />
        <Box className={styles.userDataContainer}>
          <Typography variant="body1" className={styles.row}>
            <strong>E-mail:</strong> {user.email}
          </Typography>
          <Typography variant="body1" className={styles.row}>
            <strong>Telefone:</strong> {user.phone || "Não cadastrado"}
          </Typography>
          <Typography variant="body1" className={styles.row}>
            <strong>Nascimento:</strong> {user.birth || "Não cadastrado"}
          </Typography>
          <Typography variant="body1" className={styles.row}>
            <strong>CPF:</strong> {user.cpf || "Não cadastrado"}
          </Typography>
          <Typography variant="body1" className={styles.row}>
            <strong>Cidade:</strong> {user.city || "Não cadastrado"}
          </Typography>
          <Typography variant="body1" className={styles.row}>
            <strong>CEP:</strong> {user.cep || "Não cadastrado"}
          </Typography>
          <Typography variant="body1" className={styles.row}>
            <strong>Endereço:</strong> {user.address || "Não cadastrado"}
          </Typography>
          <Typography variant="body1" className={styles.row}>
            <strong>Áreas de Interesse:</strong>{" "}
            {user.areas_de_interesse
              ? user.areas_de_interesse.join(", ")
              : "Não cadastrado"}
          </Typography>
          <Typography variant="body1" className={styles.row}>
            <strong>Tipo Profissional:</strong>{" "}
            {user.tipo_profissional || "Não cadastrado"}
          </Typography>
        </Box>
        <Divider />
        <Box className={styles.editUserContainer}>
          <PrimaryHeading>Editar Usuário</PrimaryHeading>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <InputGroup
                label="Name*"
                inputName="name"
                inputValue={newUserData.name || ""}
                inputOnChange={this.onChangeUserData}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputGroup
                label="E-mail*"
                inputName="email"
                inputValue={newUserData.email || ""}
                inputOnChange={this.onChangeUserData}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputGroup
                label="Telefone*"
                inputName="phone"
                inputMask="(99) 99999-9999"
                inputValue={newUserData.phone || ""}
                inputOnChange={this.onChangeUserData}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputGroup
                label="Nascimento"
                inputName="birth"
                inputMask="99/99/9999"
                inputValue={newUserData.birth || ""}
                inputOnChange={this.onChangeUserData}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputGroup
                label="CPF*"
                inputName="cpf"
                inputMask="999.999.999-99"
                inputValue={newUserData.cpf || ""}
                inputOnChange={this.onChangeUserData}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputGroup
                label="Cidade"
                inputName="city"
                inputValue={newUserData.city || ""}
                inputOnChange={this.onChangeUserData}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputGroup
                label="CEP*"
                inputName="cep"
                inputMask="99.999-999"
                inputValue={newUserData.cep || ""}
                inputOnChange={this.onChangeUserData}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputGroup
                label="Endereço"
                inputName="address"
                inputValue={newUserData.address || ""}
                inputOnChange={this.onChangeUserData}
              />
            </Grid>
            {renderedTipoProfissional}
          </Grid>
          {renderedAreasDeInteresse}
          <Box className={styles.buttonHolder}>
            <Button
              disabled={this.state.isLoading}
              variant="contained"
              color="primary"
              onClick={this.onFormSubmittedHandler}
            >
              Alterar Usuário
            </Button>
          </Box>
          {errorBox}
          {linearProgress}
        </Box>
      </Fragment>
    );
  }
}

export default DetalhesUsuario;
