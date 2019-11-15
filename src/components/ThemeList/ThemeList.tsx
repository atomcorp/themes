import React from 'react';

import css from './ThemeList.module.css';

type PropsType = {
  themeNames: string[];
  activeTheme: string;
  setActiveTheme: (string: string) => void;
};

const ThemeList: React.FC<PropsType> = (props) => (
  <fieldset className={css.container} name="theme" data-testid="theme-list">
    {props.themeNames.map((themeName) => (
      <div
        key={themeName}
        className={`${css.theme} ${
          themeName === props.activeTheme ? css.active : ''
        }`}
      >
        <input
          type="radio"
          id={themeName}
          name="theme"
          value={themeName}
          checked={themeName === props.activeTheme}
          onChange={() => {
            props.setActiveTheme(themeName);
          }}
        />
        <label className={css.label} htmlFor={themeName}>
          <span className={css.tabbed}>{themeName}</span>
        </label>
      </div>
    ))}
  </fieldset>
);

export default ThemeList;
