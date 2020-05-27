// modules
import React from 'react';

// components
import Toggle from 'components/Toggle/Toggle';
import ThemeSelect from 'components/ThemeSelect/ThemeSelect';

// utils
import {Logo, Dark, Light, Console, Colours} from 'Icons';
import css from './Toolbar.module.css';
import {actionTypes, themeShadeType, previewType, themeType} from 'types';

type PropType = {
  themeShade: themeShadeType;
  previewType: previewType;
  dispatch: React.Dispatch<actionTypes>;
  themeNames: string[];
  activeTheme: string;
};

const shadeValues = [
  {
    value: 'DARK',
    label: 'Dark',
    icon: (isSelected: boolean) => <Dark size="18px" colour="#ededed" />,
  },
  {
    value: 'LIGHT',
    label: 'Light',
    icon: (isSelected: boolean) => <Light size="18px" colour="#ededed" />,
  },
];

const previewValues = [
  {
    value: 'console',
    label: 'Console',
    icon: (isSelected: boolean) => <Console size="18px" colour="#ededed" />,
  },
  {
    value: 'colour',
    label: 'Colour',
    icon: (isSelected: boolean) => <Colours size="18px" colour="#ededed" />,
  },
];

const Toolbar = (props: PropType) => (
  <section
    className={`${css.container} ${
      props.themeShade === 'DARK' ? css.dark : css.light
    }`}
  >
    <a href="/themes" className={css.title}>
      <Logo size="48px" />
      <h1>Windows Terminal Themes</h1>
    </a>
    <section>
      <ThemeSelect
        themeNames={props.themeNames}
        dispatch={props.dispatch}
        activeTheme={props.activeTheme}
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
    <section>Buttons</section>
  </section>
);

export default Toolbar;
