import React from 'react';

import {backgroundKeyType, themeType, textKeyType} from 'types';
import css from './ColourTest.module.css';

export const backgroundKeys: backgroundKeyType[] = [
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

export const textKeys: textKeyType[] = [
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
  theme: themeType;
};

const ColourTest: React.FC<PropsType> = (props) => {
  return (
    <>
      <section className={css.matrix} data-testid="colourtest">
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
      </section>
      {Array.isArray(props.theme.meta.credits) && (
        <div className={css.credits} data-testid="credit">
          credit: {props.theme.name} {'- '}
          {props.theme.meta.credits.map((credit, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>/</span>}
              <a href={credit.link}>{credit.name}</a>
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default ColourTest;
