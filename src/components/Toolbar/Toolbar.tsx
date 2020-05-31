// modules
import React from 'react';

// components
import Toggle from 'components/Toggle/Toggle';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';
import More from 'components/More/More';

// utils
import {Logo, Dark, Light, Console, Colours} from 'Icons';
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
};

const shadeValues = [
  {
    value: 'DARK',
    label: 'Dark',
    icon: () => (
      <Dark
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
  {
    value: 'LIGHT',
    label: 'Light',
    icon: () => (
      <Light
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
];

const previewValues = [
  {
    value: 'console',
    label: 'Console',
    icon: () => (
      <Console
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
  {
    value: 'colour',
    label: 'Colour',
    icon: () => (
      <Colours
        size="18px"
        colour={document.documentElement.style.getPropertyValue(
          '--toolbar__color'
        )}
      />
    ),
  },
];

const Toolbar = (props: PropType) => (
  <section className={css.container}>
    <a href="/themes" className={css.title}>
      <Logo size="48px" colours={props.colours} />
      <h1>Windows Terminal Themes</h1>
    </a>
    <section className={css.select}>
      <ThemeSelect
        themeNames={props.themeNames}
        dispatch={props.dispatch}
        activeTheme={props.activeTheme}
        themeselectRef={props.themeselectRef}
      />
    </section>
    <section className={css.toggles}>
      <Toggle
        currentValue={props.themeShade}
        dispatch={props.dispatch}
        type="SHADE"
        values={shadeValues}
      />
      <Toggle
        currentValue={props.previewType}
        dispatch={props.dispatch}
        type="PREVIEW"
        values={previewValues}
      />
    </section>
    <section className={css.more}>
      <More isMoreOpen={props.isMoreOpen} dispatch={props.dispatch} />
    </section>
  </section>
);

export default Toolbar;
