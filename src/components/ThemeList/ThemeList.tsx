import React from 'react';

import css from './ThemeList.module.css';

type PropsType = {
  themeNames: string[];
  activeTheme: string;
  setActiveTheme: (string: string) => void;
};

const ThemeList: React.FC<PropsType> = (props) => (
  <section className={css.container}>
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
          name="themes"
          value={themeName}
          checked={themeName === props.activeTheme}
          onChange={() => {
            props.setActiveTheme(themeName);
          }}
        />
        <label className={css.label} htmlFor={themeName}>
          {themeName}
        </label>
      </div>
    ))}
  </section>
);

export default ThemeList;
