import React from 'react';

import styles from './ErrorMessage.module.css';

const ErrorMessage = (props) => (
  <p className={styles.Error}>{props.children}</p>
);

export default ErrorMessage;