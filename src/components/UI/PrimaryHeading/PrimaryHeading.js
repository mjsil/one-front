import React from 'react';

import styles from './PrimaryHeading.module.css';

const PrimaryHeading = (props) => (
  <h1 className={styles.PrimaryHeading}>{props.children}</h1>
);

export default PrimaryHeading;