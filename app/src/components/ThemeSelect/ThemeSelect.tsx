/**
 * I made the direction buttons here <div> not <buttons>
 * as they just duplicate the functionality of the <select>
 * It seems better to remove the extra focusable elements,
 * so people needing a11y jump straight to the <select>
 */
import React from 'react';

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
      <div
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
      </div>
      <label className={css.label} htmlFor="theme-select">
        <span className="visually-hidden ">Select theme</span>
        <select
          data-testid="theme-list"
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
            <option
              data-testid="theme-option"
              value={themeName}
              key={themeName}
            >
              {themeName}
            </option>
          ))}
        </select>
      </label>
      <div
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
      </div>
    </div>
  );
};

export default ThemeSelect;
