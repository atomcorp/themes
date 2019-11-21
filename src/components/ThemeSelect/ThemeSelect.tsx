import React from 'react';

import {actionTypes} from 'types';
import css from './ThemeSelect.module.css';

type PropsType = {
  themeNames: string[];
  activeTheme: string;
  dispatch: React.Dispatch<actionTypes>;
};

const ThemeSelect: React.FC<PropsType> = (props) => (
  <label className={css.container} htmlFor="theme-select">
    Change theme:{' '}
    <select
      id="theme-select"
      className={css.select}
      value={props.activeTheme}
      onChange={(e) => {
        e.preventDefault();
        if (e.target) {
          props.dispatch({type: 'SET', theme: e.target.value});
        }
      }}
    >
      {props.themeNames.map((themeName) => (
        <option value={themeName} key={themeName}>
          {themeName}
        </option>
      ))}
    </select>
  </label>
);

export default ThemeSelect;
