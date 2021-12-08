import React, { useReducer, useEffect } from 'react';

import { validate } from '../UI/util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Input = props => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isTouched: false,
    isValid: props.valid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  // const mapRef = useRef();

  // const options = {
  //   componentRestrictions: { country: ["us", "ca"] },
  //   fields: ["address_components"],
  //   strictBounds: false
  // };

  // useEffect(() => {

  //   const autocomplete = new window.google.maps.places.Autocomplete(mapRef.current, options);
  //   autocomplete.addListener("place_changed", () => {
  //     const place = autocomplete.getPlace();
  //     let address = "";

  //     for (const component of place.address_components) {
  //       const componentType = component.types[0];

  //       switch (componentType) {
  //         case "street_number": {
  //           address = `${component.long_name} ${address}`;
  //           break;
  //         }
  //         case "route": {
  //           address += component.short_name;
  //           break;
  //         }

  //       }
  //     }
  //   });


  // }, [changeHandler]);

  let element = (<textarea
    id={props.id}
    rows={props.rows || 3}
    onChange={changeHandler}
    onBlur={touchHandler}
    value={props.value}
    disabled={props.isDisabled}
  />);

  if (props.element === 'input' && props.id === 'serviceAddress') {
    element = (<input
      id={props.id}
      ref={mapRef}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={props.value}
      disabled={props.isDisabled}
    />)
  } else if (props.element === 'input') {
    element = (<input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={props.value}
      disabled={props.isDisabled}
    />)
  }

  return (
    <div
      className={`form-control ${props.classStyle} ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'} ${props.isDisabled && 'form-control--disabled'} ${props.isHighlighted && 'form-control--highlight'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
