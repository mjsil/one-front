import React from 'react';
import PropTypes from 'prop-types';

import styles from './ErrorMessage.module.css';

const ErrorMessage = (props) => (
  <p className={styles.Error}>{props.children}</p>
);

ErrorMessage.propTypes = {
  children: PropTypes.string
}

export default ErrorMessage;