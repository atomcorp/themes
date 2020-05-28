import React, {useRef} from 'react';

import {actionTypes} from 'types';
import css from './ThemeSelect.module.css';
import {Arrow} from 'Icons';

type PropsType = {
  themeNames: string[];
  activeTheme: string;
  dispatch: React.Dispatch<actionTypes>;
  primaryColour?: string;
  themeselectRef: React.MutableRefObject<null | HTMLSelectElement>;
};

const ThemeSelect: React.FC<PropsType> = (props) => {
  return (
    <div className={css.container}>
      <button
        className={css.direction}
        onClick={() => {
          props.dispatch({type: 'PREV'});
        }}
      >
        <Arrow
          className={css.arrow}
          colour={getComputedStyle(document.documentElement).getPropertyValue(
            '--btn__colour'
          )}
          size="18px"
        />
        Prev
      </button>
      <label className={css.label} htmlFor="theme-select">
        <span className="visually-hidden ">Select theme</span>
        <select
          ref={props.themeselectRef}
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
      <button
        className={css.direction}
        onClick={() => {
          props.dispatch({type: 'NEXT'});
        }}
      >
        Next
        <Arrow
          className={css.arrow}
          direction="right"
          size="18px"
          colour={getComputedStyle(document.documentElement).getPropertyValue(
            '--btn__colour'
          )}
        />
      </button>
    </div>
  );
};

export default ThemeSelect;
