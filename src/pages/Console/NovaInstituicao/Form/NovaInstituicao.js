import React, { Component, Fragment } from 'react';

import axios from '../../../../axios-instance';
import { Redirect } from 'react-router-dom';
import PrimaryHeading from '../../../../components/UI/PrimaryHeading/PrimaryHeading';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../../../components/Form/ErrorMessage/ErrorMessage';
import SelectGroup from '../../../../components/Form/Group/SelectGroup/SelectGroup';
import InputGroup from '../../../../components/Form/Group/InputGroup/InputGroup';
import Button from '../../../../components/Form/Button/Button';
import styles from './NovaInstituicao.module.css';

class NovaInstituicao extends Component {
  state = {
    formData: {
      userId: null,
      name: '',
      email: '',
      permission: 1,
      type: 1
    },
    errorMsg: null,
    loading: false,
    redirectToUsers: false
  }

  componentDidMount() {
    if (this.props.location.state) {
      const userId = this.props.location.state.userId;

      if (!userId) {
        return this.setState({ redirectToUsers: false });
      }

      const formData = { ...this.state.formData };
      formData.userId = userId;

      this.setState({ formData: formData });
    } else {
      this.setState({ redirectToUsers: true });
    }
  }

  onInputChangedHandler = (event) => {
    const formData = { ...this.state.formData };
    const inputName = event.target.name;
    const inputValue = event.target.value;
    formData[inputName] = inputValue;

    this.setState({ formData: formData });
  }

  onSelectChangedHandler = event => {
    const formData = { ...this.state.formData };
    const selectName = event.target.name;
    const itemValue = event.target.value;
    formData[selectName] = parseInt(itemValue);

    this.setState({ formData: formData });
  }

  onPostFormHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = { ...this.state.formData };
    const dataToPost = {
      id_user: formData.userId,
      name: formData.name,
      email: formData.email,
      permission: formData.permission,
      type: formData.type
    };

    axios
      .post('/institutions', dataToPost)
      .then(res => {
        const { error } = res.data;
        if (error) {
          this.setState({ errorMsg: error, loading: false });
        } else {
          this.props.history.replace('/console/nova-instituicao');
        }
      })
      .catch(err => {
        if (err.response.data) {
          this.setState({ errorMsg: err.response.data.error})
        }
        this.setState({ loading: false });
      });
  }

  render() {
    let errorMessage = null;
    if (this.state.errorMsg) {
      errorMessage = <ErrorMessage>{this.state.errorMsg}</ErrorMessage>
    }

    let contentToRender = (
      <Fragment>
      <PrimaryHeading>Cadastrar Instituição</PrimaryHeading>
      <form className={styles.form} onSubmit={this.onPostFormHandler}>
        {errorMessage}
        <div className={styles.groups}>
          <InputGroup
            label="Nome"
            inputName="name"
            inputType="text"
            inputValue={this.state.formData.name}
            inputOnChange={this.onInputChangedHandler}
          />
          <InputGroup
            label="E-mail"
            inputName="email"
            inputValue={this.state.formData.email}
            inputType="email"
            inputOnChange={this.onInputChangedHandler}
          />
          <SelectGroup
            label="Permissão"
            selectName="permission"
            selectValue={this.state.formData.permission}
            selectOnChange={this.onSelectChangedHandler}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </SelectGroup>
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
      </Fragment>
    );

    if (this.state.loading) {
      contentToRender = <Spinner />
    }

    return (
      <div className={styles.container}>
        {this.state.redirectToUsers ? <Redirect to="/console/nova-instituicao" /> : (
          contentToRender
        )}
      </div>
    );
  }
}

export default NovaInstituicao;