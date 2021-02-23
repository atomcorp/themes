// modules
import React from 'react';

// components
import Toggles from 'components/Toggle/Toggles';

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
  isSmallScreenSize: boolean;
};

const Toolbar = (props: PropType): JSX.Element => {
  return (
    <section className={css.container}>
      <a href="/" className={css.title}>
        <Logo size="48px" colours={props.colours} className={css.logo} />
        <h1>Windows Terminal Themes</h1>
      </a>
      {!props.isSmallScreenSize && (
        <div className={css.toggles}>
          <Toggles
            themeShade={props.themeShade}
            previewType={props.previewType}
            dispatch={props.dispatch}
          />
        </div>
      )}
    </section>
  );
};

export default Toolbar;
