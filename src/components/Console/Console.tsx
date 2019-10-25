import React from 'react';

import {themeType} from 'types';
import css from './Console.module.css';
import {backgroundKeys, textKeys, getRandomColour} from './consoleMethods';

type PropsType = {
  theme?: themeType;
};

const Console: React.FC<PropsType> = (props) => {
  if (!props.theme) {
    return <div>Loading...</div>;
  }
  return (
    <section
      className={css.container}
      style={{background: props.theme.background}}
    >
      <h2 className={css.name} style={{color: getRandomColour(props.theme)}}>
        {props.theme.name}
      </h2>
      {textKeys.map((textKey, i) => (
        <div className={css.row} key={i}>
          {backgroundKeys.map((backgroundKey, i) => (
            <div
              key={i}
              className={css.col}
              style={{
                background: props.theme ? props.theme[backgroundKey] : '',
              }}
            >
              <div
                className={css.cell}
                style={{color: props.theme ? props.theme[textKey] : ''}}
              >
                gYw
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Console;
