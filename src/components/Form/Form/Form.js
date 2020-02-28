import React from 'react';
import styles from './Form.module.css';

const Form = (props) => {
  return (
    <form className={styles.Form} onSubmit={props.formOnSubmit}>
      {props.children}
    </form>
  );
}

export default Form;
