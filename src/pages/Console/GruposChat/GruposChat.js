import React, { Component } from 'react';

import PrimaryHeading from '../../../components/UI/PrimaryHeading/PrimaryHeading';
import AddIcon from '@material-ui/icons/Add';
import styles from './GruposChat.module.css';

class GruposChat extends Component {
  render() {
    return (
      <div>
        <PrimaryHeading>Grupos Chat</PrimaryHeading>
        <div className={styles.container}>
          <div className={styles.box}>
              <h2 className={styles.heading}>Lista de grupos</h2>
              <div className={styles.groupsContainer}>
                <button className={styles.groupItem}>Grupo família</button>
                <button className={styles.groupItem}>Grupo amigos</button>
                <button className={styles.groupItem}>Grupo Trabalho</button>
              </div>
              <button className={styles.btnAddGroup}>
                <AddIcon /> Adicionar novo grupo
              </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GruposChat;