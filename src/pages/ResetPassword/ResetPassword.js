import React, { Component } from "react";

import axios from "../../axios-instance";
import Form from "../../components/Form/Form/Form";
import InputGroup from "../../components/Form/Group/InputGroup/InputGroup";
import Button from "../../components/Form/Button/Button";
import logo from "../../assets/Logo.png";
import styles from "./ResetPassword.module.css";

class ForgottenPassword extends Component {
  state = {
    formData: {
      newPassword: "",
      confirmNewPassword: ""
    },
    token: null,
    errorMessage: null
  };

  componentDidMount() {
    const token = this.props.match.params.token;
    axios
      .post("/verify/" + token)
      .then(res => {
        this.setState({ token: res.data.token });
      })
      .catch(err => {
        this.props.history.replace("/");
      });
  }

  onChangeInputHandler = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const formData = { ...this.state.formData };
    formData[inputName] = inputValue;
    this.setState({ formData });
  };

  onResetPasswordHandler = event => {
    event.preventDefault();

    const formData = { ...this.state.formData };
    if (formData.newPassword !== formData.confirmNewPassword) {
      return this.setState({ errorMessage: "As senhas devem ser iguais." });
    }

    axios
      .post("/reset/" + this.state.token, { newPassword: formData.newPassword })
      .then(res => {
        this.props.history.replace("/");
      })
      .catch(err => {
        this.props.history.replace("/");
      });
  };

  render() {
    return (
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="1Net Logo" />
        <Form formOnSubmit={this.onResetPasswordHandler}>
          <h1 className={styles.primaryHeading}>Redefinir Senha</h1>
          <InputGroup
            label="Nova Senha"
            inputName="newPassword"
            inputType="password"
            inputOnChange={this.onChangeInputHandler}
          />
          <InputGroup
            label="Confirmar Senha"
            inputName="confirmNewPassword"
            inputType="password"
            inputOnChange={this.onChangeInputHandler}
          />
          <Button type="submit">Redefinir</Button>
        </Form>
      </div>
    );
  }
}

export default ForgottenPassword;
