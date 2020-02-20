import React, { Component, Fragment } from 'react';
import axios from '../../../axios-instance';

import Form from '../../../components/AuthForm/Form/Form';
import Button from '../../../components/AuthForm/Button/Button';
import Input from '../../../components/AuthForm/Input/Input';
import Logo from '../../../components/AuthForm/Logo/Logo';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Links from '../../../components/AuthForm/Links/Links';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  }

  onChangeInputHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState({
      [inputName]: inputValue
    });
  }

  onFormSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {
      email: this.state.email,
      password: this.state.password
    };
  }

  render() {
    let contentToRender = (
      <Fragment>
        <Logo />
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={this.onChangeInputHandler}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.onChangeInputHandler}
        />
        <Button type="submit">Login</Button>
        <Links>
          <p>Cadastre-se</p>
          <p>Esqueci a senha</p>
        </Links>
      </Fragment>
    );

    if (this.state.loading) {
      contentToRender = (
        <Fragment>
          <h1>Loading...</h1>
        </Fragment>
      );
    }
    return (
      <Form formOnSubmit={this.onFormSubmitHandler}>
        {contentToRender}
      </Form>
    );
  }
}

export default Login;
