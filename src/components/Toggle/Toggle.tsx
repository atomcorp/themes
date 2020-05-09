import React, {ReactElement} from 'react';

import {THEME_COLOUR} from 'components/Home/homeMethods';
import {themeShadeType, actionTypes} from 'types';
import css from './Toggle.module.css';

type PropsState = {
  values: {
    value: string;
    label: string;
    icon: (isChecked: boolean) => ReactElement;
  }[];
  primaryColour: string;
  backgroundColour: string;
  currentValue: string;
  type: string;
  dispatch: React.Dispatch<actionTypes>;
};

const Toggle: React.FC<PropsState> = (props) => (
  <section
    className={css.container}
    style={{
      backgroundColor: props.backgroundColour,
      border: `3px solid ${props.primaryColour}`,
    }}
  >
    {props.values.map((option) => {
      const isSelected = option.value === props.currentValue;
      return (
        <label
          className={`${css.label} ${isSelected ? css.active : ''}`}
          htmlFor={option.value}
          style={{
            backgroundColor: isSelected ? props.primaryColour : 'initial',
          }}
        >
          <input
            name="shade"
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
          {option.icon(isSelected)}
        </label>
      );
    })}
  </section>
);

export default Toggle;
