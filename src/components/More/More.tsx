import React, {useState} from 'react';

import {Chevron} from 'Icons';

import {actionTypes} from 'types';
import css from './More.module.css';

type MoreType = {
  isMoreOpen: boolean;
  dispatch: React.Dispatch<actionTypes>;
};

// https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
const Info = (props: MoreType) => {
  return (
    <section>
      <button
        onClick={() => {
          props.dispatch({type: 'MORE'});
        }}
        className={css.trigger}
        aria-controls="more"
        aria-haspopup="true"
        aria-expanded={props.isMoreOpen}
      >
        More{' '}
        <Chevron
          colour={document.documentElement.style.getPropertyValue(
            '--toolbar__color'
          )}
        />
      </button>
    </section>
  );
};

export default Info;
