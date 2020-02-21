import React from 'react';

import styles from './Perfil.module.css';

const Perfil = (props) => (
  <span className={styles.Perfil}>
    <div className={styles.shape}><span>{props.name}</span></div>
  </span>
);

export default Perfil;