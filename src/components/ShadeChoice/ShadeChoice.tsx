import React from 'react';

import {THEME_COLOUR} from 'components/Home/homeMethods';
import {themeShadeType, actionTypes} from 'types';

type PropsState = {
  themeShade: themeShadeType;
  dispatch: React.Dispatch<actionTypes>;
};

const ShadeChoice: React.FC<PropsState> = (props) => (
  <section>
    <label htmlFor="all">All</label>
    <input
      type="radio"
      id="all"
      value={THEME_COLOUR.ANY}
      checked={THEME_COLOUR.ANY === props.themeShade}
      onChange={() => {
        props.dispatch({type: 'SHADE', themeShade: THEME_COLOUR.ANY});
      }}
    />
    <br />
    <label htmlFor="dark">Dark</label>
    <input
      type="radio"
      id="dark"
      value={THEME_COLOUR.DARK}
      checked={THEME_COLOUR.DARK === props.themeShade}
      onChange={() => {
        props.dispatch({type: 'SHADE', themeShade: THEME_COLOUR.DARK});
      }}
    />
    <br />
    <label htmlFor="light">Light</label>
    <input
      type="radio"
      id="light"
      value={THEME_COLOUR.LIGHT}
      checked={THEME_COLOUR.LIGHT === props.themeShade}
      onChange={() => {
        props.dispatch({type: 'SHADE', themeShade: THEME_COLOUR.LIGHT});
      }}
    />
  </section>
);

export default ShadeChoice;
