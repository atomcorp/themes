import React from 'react';

type PropsType = {
  themeNames: string[];
  activeTheme: string;
  setActiveTheme: (string: string) => void;
};

const ThemeList: React.FC<PropsType> = (props) => (
  <section>
    {props.themeNames.map((themeName) => (
      <div key={themeName}>
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
        <label htmlFor={themeName}>{themeName}</label>
      </div>
    ))}
  </section>
);

export default ThemeList;
