import React from 'react';

import styles from './Button.module.css'

const Button = (props) => (
    <button className={styles.Button} {...props}>{props.children}</button>
);

export default Button;