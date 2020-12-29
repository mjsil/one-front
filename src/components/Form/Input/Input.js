import React from 'react';

import InputMask from 'react-input-mask';
import styles from './Input.module.css';

const Input = (props) => (
  <InputMask
    {...props}
    className={styles.Input}
    maskChar={null} />
);

export default Input;
