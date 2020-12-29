import React from 'react';

import styles from './Links.module.css';

const Links = (props) => (
  <div className={styles.Links}>
    {props.children}
  </div>
);

export default Links;
