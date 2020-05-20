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

const scrollToSelected = (
  listElRef: React.RefObject<HTMLFieldSetElement>,
  themename: string | null
) => {
  if (
    listElRef.current != null &&
    themename != null &&
    window.innerWidth >= 1024
  ) {
    const labelEl = listElRef.current.querySelector(`[for="${themename}"]`);
    if (labelEl != null) {
      listElRef.current.scrollBy({
        left: 0,
        top:
          labelEl.getBoundingClientRect().top -
          listElRef.current.offsetHeight / 2,
        behavior: 'smooth',
      });
    }
  }
};

const ThemeList: React.FC<PropsType> = (props) => {
  const {activeTheme} = props;
  const listElRef = useRef<HTMLFieldSetElement>(null);
  useEffect(() => {
    scrollToSelected(listElRef, activeTheme);
  }, [activeTheme]);
  return (
    <fieldset
      className={css.container}
      name="theme"
      data-testid="theme-list"
      ref={listElRef}
    >
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
            id={themeName}
            name="theme"
            value={themeName}
            checked={themeName === props.activeTheme}
            onChange={() => {
              props.dispatch({type: 'SET', theme: themeName});
            }}
          />
          <label className={css.label} htmlFor={themeName}>
            <span className={css.tabbed}>{themeName}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default ThemeList;
