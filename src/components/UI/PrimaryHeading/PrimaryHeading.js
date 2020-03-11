import React from 'react';
import PropTypes from 'prop-types';

import styles from './PrimaryHeading.module.css';

const PrimaryHeading = (props) => (
  <h1 className={styles.PrimaryHeading}>{props.children}</h1>
);

PrimaryHeading.propTypes = {
  children: PropTypes.string
}

export default PrimaryHeading;