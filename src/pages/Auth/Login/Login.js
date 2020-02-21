import React, { Component, Fragment } from 'react';
import { setToken } from '../../../services/institution-token';
import { login } from '../../../services/auth';
import { withRouter } from 'react-router-dom';
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
      .post('/institutionsessions', formData)
      .then(res => {
        const jwtToken = res.data.token;
        const userId = res.data.user.id;
        setToken(userId);
        return login(jwtToken);
      })
      .then(() => {
        this.props.history.replace('/console');
      })
      .catch(err => {
        if (err.response.data) {
          this.setState({ errorMessage: err.response.data.error})
        }
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
          value={this.state.email}
          onChange={this.onChangeInputHandler}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
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

export default withRouter(Login);
