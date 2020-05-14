import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PrimaryHeading from "../../../../components/UI/PrimaryHeading/PrimaryHeading";
import InputGroup from "../../../../components/Form/Group/InputGroup/InputGroup";
import SelectGroup from "../../../../components/Form/Group/SelectGroup/SelectGroup";
import TransferList from "../../../../components/UI/TransferList/TransferList";

import styles from "./DetalhesUsuario.module.css";

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

const AREAS_DE_INTERESSE = Object.freeze({
  RESPONSABILIDADE_SOCIAL: enumValue("RESPONSABILIDADE_SOCIAL"),
  INOVACAO: enumValue("INOVACAO"),
  INTERESSE_SOCIAL: enumValue("INTERESSE_SOCIAL"),
  INFRAESTRUTURA: enumValue("INFRAESTRUTURA"),
  JURIDICO: enumValue("JURIDICO"),
  INDUSTRIA_IMOBILIARIA: enumValue("INDUSTRIA_IMOBILIARIA"),
  SUSTENTABILIDADE: enumValue("SUSTENTABILIDADE"),
  RELACOES_TRABALHISTAS: enumValue("RELACOES_TRABALHISTAS"),
  OBRAS_INDUSTRIAIS: enumValue("OBRAS_INDUSTRIAIS"),
  SERVICOS_CBIC: enumValue("SERVICOS_CBIC"),
});

class DetalhesUsuario extends Component {
  state = {
    user: {},
    newUserData: {},
    leftTransferList: [
      AREAS_DE_INTERESSE.RESPONSABILIDADE_SOCIAL.toString(),
      AREAS_DE_INTERESSE.INOVACAO.toString(),
      AREAS_DE_INTERESSE.INTERESSE_SOCIAL.toString(),
      AREAS_DE_INTERESSE.JURIDICO.toString(),
      AREAS_DE_INTERESSE.INDUSTRIA_IMOBILIARIA.toString(),
      AREAS_DE_INTERESSE.SUSTENTABILIDADE.toString(),
      AREAS_DE_INTERESSE.RELACOES_TRABALHISTAS.toString(),
      AREAS_DE_INTERESSE.OBRAS_INDUSTRIAIS.toString(),
      AREAS_DE_INTERESSE.SERVICOS_CBIC.toString(),
    ],
    selectedTipoProfissionalIndex: 0,
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

  setLeftTransferListHandler = (values) => {
    this.setState({ leftTransferList: values });
  };

  setRightTransferListHandler = (values) => {
    this.setState({ rightTransferList: values });
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
      areas_de_interesse: this.state.rightTransferList,
      tipo_profissional: this.getTipoProfissionalString(),
    };
    console.log(dataToPut);
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
    return (
      <Fragment>
        <PrimaryHeading>Detalhes Usuário</PrimaryHeading>
        <Typography variant="h5">{user.name}</Typography>
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
                label="Nascimento*"
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
                label="Cidade*"
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
                label="Endereço*"
                inputName="address"
                inputValue={newUserData.address || ""}
                inputOnChange={this.onChangeUserData}
              />
            </Grid>
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
                <option value={6}>
                  {TIPO_PROFISSIONAL.IMPRENSA.toString()}
                </option>
              </SelectGroup>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" align="center">
            Selecione as áreas de interesse*
          </Typography>
          <TransferList
            left={this.state.leftTransferList}
            right={this.state.rightTransferList}
            setLeft={this.setLeftTransferListHandler}
            setRight={this.setRightTransferListHandler}
          />
          <Box className={styles.buttonHolder}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onFormSubmittedHandler}
            >
              Alterar Usuário
            </Button>
          </Box>
        </Box>
      </Fragment>
    );
  }
}

export default DetalhesUsuario;
