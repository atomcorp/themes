import React from 'react';

import Toggle from 'components/Toggle/Toggle';

import {Logo, Dark, Light} from 'Icons';
import css from './Toolbar.module.css';
import {actionTypes, themeShadeType} from 'types';

type PropType = {
  themeShade: themeShadeType;
  dispatch: React.Dispatch<actionTypes>;
};

const Toolbar = (props: PropType) => (
  <section
    className={`${css.container} ${
      props.themeShade === 'DARK' ? css.dark : css.light
    }`}
  >
    <a href="/themes" className={css.title}>
      <h1>Windows Terminal Themes</h1>
      <Logo size="48px" />
    </a>
    <section>List view</section>
    <section>
      <Toggle
        currentValue={props.themeShade}
        dispatch={props.dispatch}
        type="SHADE"
        values={[
          {
            value: 'DARK',
            label: 'Dark',
            icon: (isSelected: boolean) => (
              <Dark size="18px" colour="#ededed" />
            ),
          },
          {
            value: 'LIGHT',
            label: 'Light',
            icon: (isSelected: boolean) => (
              <Light size="18px" colour="#ededed" />
            ),
          },
        ]}
      />
    </section>
    <section>Buttons</section>
  </section>
);

export default Toolbar;
