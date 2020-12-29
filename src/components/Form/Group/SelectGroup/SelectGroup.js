import React from 'react';
import PropTypes from 'prop-types';

import styles from './SelectGroup.module.css';

const Group = (props) => {
  return (
    <div className={styles.Group}>
      <label>{props.label}</label>
      <select
        className={styles.select}
        name={props.selectName} 
        value={props.selectValue} 
        onChange={props.selectOnChange}
      >
        {props.children} 
      </select>
    </div>
  );
}

Group.propTypes = {
  label: PropTypes.string,
  selectName: PropTypes.string,
  selectValue: PropTypes.number,
  selectOnChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.element)
}

export default Group;