import React from 'react';

import {actionTypes} from 'types';
import css from './ThemeSelect.module.css';
import {Arrow} from 'Icons';

type PropsType = {
  themeNames: string[];
  activeTheme: string;
  dispatch: React.Dispatch<actionTypes>;
  primaryColour?: string;
};

const ThemeSelect: React.FC<PropsType> = (props) => (
  <div className={css.container}>
    <Arrow
      className={css.arrow}
      onClick={() => {
        props.dispatch({type: 'PREV'});
      }}
      colour={props.primaryColour}
      size="48px"
    />
    <label className={css.label} htmlFor="theme-select">
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
    <Arrow
      className={css.arrow}
      onClick={() => {
        props.dispatch({type: 'NEXT'});
      }}
      colour={props.primaryColour}
      direction="right"
      size="48px"
    />
  </div>
);

export default ThemeSelect;
