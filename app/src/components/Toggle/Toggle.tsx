import React, {ReactElement} from 'react';

import {actionTypes} from 'types';
import css from './Toggle.module.css';

type PropsState = {
  values: {
    value: string;
    label: string;
    icon: (isChecked: boolean) => ReactElement;
  }[];
  currentValue: string;
  type: string;
  dispatch: React.Dispatch<actionTypes>;
};

const Toggle: React.FC<PropsState> = (props) => (
  <section className={css.container}>
    {props.values.map((option) => {
      const isSelected = option.value === props.currentValue;
      return (
        <label
          key={option.value}
          className={`${css.label} ${isSelected ? css.active : ''}`}
          htmlFor={option.value}
          data-testid={`toggle-label-${option.value}`}
        >
          <input
            name={props.type}
            type="radio"
            id={option.value}
            value={option.value}
            checked={isSelected}
            onChange={() => {
              props.dispatch({
                type: props.type,
                payload: option.value,
              });
            }}
            className={css.radio}
          />
          <div className={css.outline}>
            {option.icon(isSelected)}
            {option.label}
          </div>
        </label>
      );
    })}
  </section>
);

export default Toggle;
