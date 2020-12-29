import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

const Button = (props) => (
  <button className={styles.Button} {...props}>
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string,
};

export default Button;
