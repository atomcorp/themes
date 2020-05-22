import React, {useEffect, useRef} from 'react';

import {actionTypes} from 'types';
import css from './ThemeList.module.css';

type PropsType = {
  themeNames: string[];
  activeTheme: string;
  dispatch: React.Dispatch<actionTypes>;
  primaryColour: string;
  backgroundColour: string;
};

const scrollToSelected = (themename: string | null) => {
  if (themename != null && window.innerWidth >= 1024) {
    const inputEl = document.getElementById(themename.replace(' ', '-'));
    // hold up: https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/focus
    if (inputEl != null) {
      inputEl.focus();
    }
  }
};

const ThemeList: React.FC<PropsType> = (props) => {
  const {activeTheme} = props;
  useEffect(() => {
    scrollToSelected(activeTheme);
  }, [activeTheme]);
  return (
    <fieldset className={css.container} name="theme" data-testid="theme-list">
      {props.themeNames.map((themeName) => (
        <div
          key={themeName}
          style={{
            color:
              themeName === props.activeTheme ? props.backgroundColour : '',
            background:
              themeName === props.activeTheme ? props.primaryColour : '',
          }}
          className={`${css.theme}`}
        >
          <input
            type="radio"
            id={themeName.replace(' ', '-')}
            name="theme"
            value={themeName}
            checked={themeName === props.activeTheme}
            onChange={() => {
              props.dispatch({type: 'SET', theme: themeName});
            }}
          />
          <label className={css.label} htmlFor={themeName.replace(' ', '-')}>
            <span className={css.tabbed}>{themeName}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default ThemeList;
