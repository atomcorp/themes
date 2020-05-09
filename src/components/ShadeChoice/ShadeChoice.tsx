import React from 'react';

import {THEME_COLOUR} from 'components/Home/homeMethods';
import {themeShadeType, actionTypes} from 'types';
import css from './ShadeChoice.module.css';

type PropsState = {
  themeShade: themeShadeType;
  dispatch: React.Dispatch<actionTypes>;
};

const ShadeChoice: React.FC<PropsState> = (props) => (
  <section className={css.container}>
    <label htmlFor="dark">
      <input
        name="shade"
        type="radio"
        id="dark"
        value={THEME_COLOUR.DARK}
        checked={THEME_COLOUR.DARK === props.themeShade}
        onChange={() => {
          props.dispatch({type: 'SHADE', themeShade: THEME_COLOUR.DARK});
        }}
      />
      Dark
    </label>
    <label htmlFor="light">
      <input
        name="shade"
        type="radio"
        id="light"
        value={THEME_COLOUR.LIGHT}
        checked={THEME_COLOUR.LIGHT === props.themeShade}
        onChange={() => {
          props.dispatch({type: 'SHADE', themeShade: THEME_COLOUR.LIGHT});
        }}
      />
      Light
    </label>
  </section>
);

export default ShadeChoice;
