import React from 'react';

import {themeType} from 'types';
import css from './ColourTest.module.css';
import {backgroundKeys, textKeys} from '../ThemePreview/consoleMethods';

type PropsType = {
  theme: themeType;
};

const ColourTest: React.FC<PropsType> = (props) => {
  return (
    <div className={css.matrix}>
      {textKeys.map((textKey, i) =>
        backgroundKeys.map((backgroundKey, y) => (
          <div
            key={i + ' ' + y}
            className={css.cell}
            style={{
              background: props.theme ? props.theme[backgroundKey] : '',
              color: props.theme ? props.theme[textKey] : '',
            }}
          >
            gYw
          </div>
        ))
      )}
    </div>
  );
};

export default ColourTest;
