// modules
import React from 'react';

// components
import More from 'components/More/More';
import Toggles from 'components/Toggle/Toggles';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';

// utils
import {Logo} from 'Icons';
import css from './Toolbar.module.css';
import {actionTypes, themeShadeType, previewType} from 'types';

type PropType = {
  themeShade: themeShadeType;
  previewType: previewType;
  dispatch: React.Dispatch<actionTypes>;
  themeNames: string[];
  activeTheme: string;
  themeselectRef: React.MutableRefObject<null | HTMLSelectElement>;
  colours: string[];
  isMoreOpen: boolean;
  isSmallScreenSize: boolean;
};

const Toolbar = (props: PropType): JSX.Element => {
  return (
    <section className={css.container}>
      <a href="/themes" className={css.title}>
        <Logo size="48px" colours={props.colours} className={css.logo} />
        <h1>Windows Terminal Themes</h1>
      </a>
      {!props.isSmallScreenSize && (
        <div className={css.select}>
          <ThemeSelect
            themeNames={props.themeNames}
            dispatch={props.dispatch}
            activeTheme={props.activeTheme}
            themeselectRef={props.themeselectRef}
          />
        </div>
      )}
      {!props.isSmallScreenSize && (
        <div className={css.toggles}>
          <Toggles
            themeShade={props.themeShade}
            previewType={props.previewType}
            dispatch={props.dispatch}
          />
        </div>
      )}
      <div className={css.more}>
        <More isMoreOpen={props.isMoreOpen} dispatch={props.dispatch} />
      </div>
    </section>
  );
};

export default Toolbar;
