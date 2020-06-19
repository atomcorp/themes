// modules
import React from 'react';

// components
import More from 'components/More/More';

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
  ThemeSelectContainer: () => JSX.Element;
  Toggles: () => JSX.Element;
};

const Toolbar = (props: PropType): JSX.Element => {
  const {ThemeSelectContainer, Toggles} = props;
  return (
    <section className={css.container}>
      <a href="/themes" className={css.title}>
        <Logo size="48px" colours={props.colours} className={css.logo} />
        <h1>Windows Terminal Themes</h1>
      </a>
      {!props.isSmallScreenSize && (
        <div className={css.select}>
          <ThemeSelectContainer />
        </div>
      )}
      {!props.isSmallScreenSize && (
        <div className={css.toggles}>
          <Toggles />
        </div>
      )}
      <div className={css.more}>
        <More isMoreOpen={props.isMoreOpen} dispatch={props.dispatch} />
      </div>
    </section>
  );
};

export default Toolbar;
