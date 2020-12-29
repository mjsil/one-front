import React, { Component, Fragment } from "react";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import Input from "../../../components/Form/Input/Input";
import Card from "@material-ui/core/Card";
import Button from "../../../components/Form/Button/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as yup from "yup";
import axios from "../../../axios-instance";

import styles from "./Cartao.module.css";

const formSchema = yup.object().shape({
  nome_completo: yup
    .string()
    .required("É obrigatório preencher o nome completo")
    .min(2, "Digite seu nome completo"),
  data_nascimento: yup
    .string()
    .required("É obrigatório preencher a data de nascimento")
    .min(10, "Digite uma data válida"),
  cpf: yup
    .string()
    .required("É obrigatório preencher o cpf")
    .min(14, "Digite um CPF válido"),
  email: yup
    .string()
    .required("É obrigatório preencher o email")
    .email("Digite um email válido"),
  nome_da_mae: yup
    .string()
    .required("É obrigatório preencher o nome completo da mãe")
    .min(3, "Digite o nome completo da mãe"),
  telefone_celular: yup
    .string()
    .required("É obrigatório preencher o telefone")
    .min(14, "Digite um número de telefone válido"),
});

class Cartao extends Component {
  state = {
    loggedUser: null,
    formData: {
      nome_completo: "",
      data_nascimento: "",
      cpf: "",
      email: "",
      nome_da_mae: "",
      telefone_celular: "",
    },
    errorMessage: null,
    loading: false,
  };

  componentDidMount() {
    axios.get("/user").then((res) => {
      const { data } = res;

      const formData = {
        nome_completo: data.name || "",
        data_nascimento: data.birth || "",
        cpf: data.cpf || "",
        email: data.email || "",
        nome_da_mae: "",
        telefone_celular: data.phone || "",
      };

      this.setState({ formData });
    });
  }

  onInputChangeHandler = (event) => {
    const formData = { ...this.state.formData };
    const eventName = event.target.name;
    const eventValue = event.target.value;

    formData[eventName] = eventValue;

    this.setState({ formData });
  };

  onSubmitFormHandler = async () => {
    this.setState({ loading: true, errorMessage: null });
    const formData = { ...this.state.formData };
    const isFormDatavalid = await formSchema.isValid(formData);

    if (!isFormDatavalid) {
      return this.setState({
        loading: false,
        errorMessage:
          "Confira os campos obrigatórios digitados e garanta que tenham dados válidos.",
      });
    }

    axios
      .post("/solicitacaocartao", formData)
      .then((res) => {
        this.props.openSnackbar(
          "Solicitação encaminhada. Aguarde para receber novos detalhes do seu pedido."
        );
        this.props.history.replace("/console");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            this.setState({
              errorMessage: err.response.data.error,
              loading: false,
            });
          }
        }
      });
  };

  render() {
    const formData = { ...this.state.formData };

    let errorAlert;
    if (this.state.errorMessage) {
      errorAlert = (
        <Box className={styles.errorBox}>
          <Alert severity="error">{this.state.errorMessage}</Alert>
        </Box>
      );
    }

    let loadingProgress;
    if (this.state.loading) {
      loadingProgress = (
        <Box className={styles.loadingBox}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Fragment>
        <PrimaryHeading>Cartão</PrimaryHeading>
        <Box className={styles.container}>
          <Card className={styles.card}>
            {errorAlert}
            <Typography paragraph>
              Preencha o formulário para solicitar seu cartão e poder usá-lo
              como quiser
            </Typography>
            <Input
              placeholder="Nome*"
              name="nome_completo"
              onChange={this.onInputChangeHandler}
              value={formData.nome_completo}
            />
            <Input
              placeholder="CPF"
              mask="999.999.999-99"
              name="cpf"
              onChange={this.onInputChangeHandler}
              value={formData.cpf}
            />
            <Input
              placeholder="E-mail*"
              name="email"
              onChange={this.onInputChangeHandler}
              value={formData.email}
            />
            <Input
              placeholder="Data de Nascimento*"
              mask="99/99/9999"
              name="data_nascimento"
              onChange={this.onInputChangeHandler}
              value={formData.data_nascimento}
            />
            <Input
              placeholder="Telefone () -*"
              mask="(99) 99999-9999"
              name="telefone_celular"
              onChange={this.onInputChangeHandler}
              value={formData.telefone_celular}
            />
            <Input
              placeholder="Nome da Mãe*"
              name="nome_da_mae"
              onChange={this.onInputChangeHandler}
              value={formData.nome_da_mae}
            />
            <Button
              disabled={this.state.loading}
              onClick={this.onSubmitFormHandler}
            >
              Solicitar
            </Button>
            {loadingProgress}
          </Card>
        </Box>
      </Fragment>
    );
  }
}

export default Cartao;
