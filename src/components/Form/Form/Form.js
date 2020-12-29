import React from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

const Form = (props) => {
  return (
    <form className={styles.Form} onSubmit={props.formOnSubmit}>
      {props.children}
    </form>
  );
}

Form.propTypes = {
  formOnSubmit: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.element)
}

export default Form;
