import React from 'react';

import css from './ThemeSelect.module.css';

type PropsType = {
  themeNames: string[];
  setActiveTheme: (string: string) => void;
};

const ThemeSelect: React.FC<PropsType> = (props) => (
  <select
    className={css.select}
    onChange={(e) => {
      e.preventDefault();
      if (e.target) {
        props.setActiveTheme(e.target.value);
      }
    }}
  >
    {props.themeNames.map((themeName) => (
      <option value={themeName} key={themeName}>
        {themeName}
      </option>
    ))}
  </select>
);

export default ThemeSelect;
