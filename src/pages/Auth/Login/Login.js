import React, { Component, Fragment } from 'react';
import { setToken } from '../../../services/institution-token';
import { login } from '../../../services/auth';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios-instance';

import Form from '../../../components/Form/Form/Form';
import ErrorMessage from '../../../components/Form/ErrorMessage/ErrorMessage';
import Button from '../../../components/Form/Button/Button';
import Input from '../../../components/Form/Input/Input';
import Logo from '../../../components/Form/Logo/Logo';
import Spinner from '../../../components/UI/Spinner/Spinner';

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
    this.setState({ loading: true, errorMessage: null });
    const formData = {
      email: this.state.email,
      password: this.state.password
    };
    
    axios
      .post('/institutionsessions', formData)
      .then(res => {
        const jwtToken = res.data.token;
        const user = res.data.user;
        setToken(user);
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
          onChange={this.onChangeInputHandler}
        />
        <Button type="submit">Login</Button>
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
