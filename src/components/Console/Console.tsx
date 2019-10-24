import React from 'react';

import {backgroundKeyType, textKeyType, themeType} from 'types';
import css from './Console.module.css';

const backgroundKeys: backgroundKeyType[] = [
  'background',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'white',
  'background',
];

const textKeys: textKeyType[] = [
  'black',
  'brightBlack',
  'red',
  'brightRed',
  'green',
  'brightGreen',
  'yellow',
  'brightYellow',
  'blue',
  'brightBlue',
  'purple',
  'brightPurple',
  'cyan',
  'brightCyan',
  'white',
  'brightWhite',
];

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
      {textKeys.map((textKey, i) => (
        <div style={{display: 'flex'}} key={i}>
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
