import React, { Component, Fragment } from 'react';
import { login } from '../../../services/auth';
import axios from '../../../axios-instance';

import Form from '../../../components/AuthForm/Form/Form';
import ErrorMessage from '../../../components/AuthForm/ErrorMessage/ErrorMessage';
import Button from '../../../components/AuthForm/Button/Button';
import Input from '../../../components/AuthForm/Input/Input';
import Logo from '../../../components/AuthForm/Logo/Logo';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Links from '../../../components/AuthForm/Links/Links';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
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
    this.setState({ loading: true, errorMessage: false });
    const formData = {
      email: this.state.email,
      password: this.state.password
    };
    
    axios
      .post('/sessions', formData)
      .then(res => {
        const jwtToken = res.data.token;
        login(jwtToken);
      })
      .catch(err => {
        if (err.response.data) {
          this.setState({ errorMessage: err.response.data.error})
        }
      })
      .finally(() => {
        this.setState({ loading: false })
      });
  }

  render() {
    let errMessage = null;
    if (this.state.errorMessage) {
      errMessage = <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
    } 
    
    let contentToRender = (
      <Fragment>
        {errMessage}
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
          <Spinner />
        </Fragment>
      );
    }
    
    return (
      <Form formOnSubmit={this.onFormSubmitHandler}>
        <Logo />
        {contentToRender}
      </Form>
    );
  }
}

export default Login;
