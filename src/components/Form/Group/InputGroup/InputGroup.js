import React from "react";
import PropTypes from "prop-types";

import Input from "../../Input/Input";

const Group = props => {
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
};

Group.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  inputMask: PropTypes.string
};

export default Group;
