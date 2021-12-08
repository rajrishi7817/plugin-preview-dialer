import React, { useState, useEffect } from 'react';

import './Select.css';

const Select = props => {
  const [selectState, setSelectState] = useState({
    value: props.value,
    isValid: props.valid
  });

  const { id, onSelect } = props;
  const { value, isValid } = selectState;

  useEffect(() => {
    onSelect(id, value, isValid)
  }, [id, value, isValid, onSelect]);

  const changeHandler = event => {
    console.log(`Selected Option =====> ${event.target.value}`)
    setSelectState({
      value: event.target.value,
      isValid: true
    });
  };

  return (
    <div className={`form-control ${props.classStyle} ${props.containerClass} ${props.isHighlighted && 'form-control--highlight'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <select id={props.id} onChange={changeHandler} disabled={props.isDisabled} value={props.value} defaultValue={props.defaultValue}>
        {props.optionsGroup ? <optgroup label={props.optionsGroup}>
          {props.options.map((option) => (
            <option value={option.value} key={option.value}>{option.name}</option>
          ))
          }
        </optgroup> :
          props.options.map((option) => (
            <option value={option.value} key={option.value}>{option.name}</option>))
        }
        {props.additionalOptions && <optgroup label={props.additionalOptionsGroup}>
          {props.additionalOptions.map((additionalOption) => (
            <option value={additionalOption.value} key={additionalOption.value}>{additionalOption.name}</option>
          ))}

        </optgroup>}
      </select>
    </div >
  );
};

export default Select;
