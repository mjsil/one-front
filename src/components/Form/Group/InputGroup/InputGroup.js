import React from 'react';

import Input from '../../Input/Input';

const Group = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <Input
        name={props.inputName}
        type={props.inputType}
        value={props.inputValue}
        onChange={props.inputOnChange}
        mask={props.inputMask}
        step={props.inputStep}
        min={props.inputMin}
        max={props.inputMax}
      />
    </div>
  );
}

export default Group;