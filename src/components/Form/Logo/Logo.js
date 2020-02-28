import React from 'react';

import logo from '../../../assets/Logo.png';
import styles from './Logo.module.css';

const Logo = () => (
  <img src={logo} alt="1NetLogo" className={styles.Logo} />
);

export default Logo;
