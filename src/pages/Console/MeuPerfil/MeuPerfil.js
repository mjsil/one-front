import React, { Component, Fragment } from 'react';

import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import Input from '../../../components/Form/Input/Input';
import Button from '../../../components/Form/Button/Button';
import Switch from '@material-ui/core/Switch';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import styles from './MeuPerfil.module.css';

class MeuPerfil extends Component {
  state = {
    editMode: false
  }

  onChangeEditModeHandler = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    let editModeMsg = (
      <p>
        {this.state.editMode ? 'Desabilitar edição' : 'Habilitar Edição'}
      </p>
    );
    return (
      <Fragment>
        <PrimaryHeading>Meu Perfil</PrimaryHeading>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.cardToolbar}>
              <Switch checked={this.state.editMode} onChange={this.onChangeEditModeHandler} />
              {editModeMsg}
            </div>
            <main className={styles.cardContent}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <AccountBalanceIcon className={styles.avatarIcon} fontSize="large" />
                </div>
              </div>
              <form className={styles.cardForm}>
                <label>Instituição:</label>
                <Input value="TECHIN" readOnly={!this.state.editMode} />
                <label>E-mail:</label>
                <Input value="kesley@tech-inweb.com.br" readOnly={!this.state.editMode} />
                <Button disabled={!this.state.editMode}>Editar</Button>
              </form>
            </main>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MeuPerfil;