import React from 'react';

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

export default Group;