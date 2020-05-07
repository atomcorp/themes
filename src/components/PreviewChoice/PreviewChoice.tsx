import React from 'react';

import {previewType, actionTypes} from 'types';
import css from './PreviewChoice.module.css';

type PropsState = {
  previewType: previewType;
  dispatch: React.Dispatch<actionTypes>;
};

const PreviewChoice: React.FC<PropsState> = (props) => (
  <section className={css.container}>
    Choose preview:
    <label htmlFor="console">
      <input
        name="preview"
        type="radio"
        id="console"
        value={'console'}
        checked={'console' === props.previewType}
        onChange={() => {
          props.dispatch({type: 'PREVIEW', previewType: 'console'});
        }}
      />
      Console
    </label>
    <label htmlFor="colour">
      <input
        name="preview"
        type="radio"
        id="colour"
        value={'colour'}
        checked={'colour' === props.previewType}
        onChange={() => {
          props.dispatch({type: 'PREVIEW', previewType: 'colour'});
        }}
      />
      Colours
    </label>
  </section>
);

export default PreviewChoice;
