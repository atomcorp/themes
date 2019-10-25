import React from 'react';
import contrast from 'get-contrast';

import {backgroundKeyType, textKeyType, themeType} from 'types';
import css from './Console.module.css';

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

type titleColoursType =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'purple'
  | 'cyan'
  | 'white';

const titleColours: titleColoursType[] = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'white',
];

const getRandomColour = (theme: themeType): string => {
  const randomisedColours = titleColours.sort(() => Math.random() - 0.5);
  const accessibleColour = randomisedColours.find(
    (titleColour: titleColoursType) =>
      contrast.isAccessible(theme[titleColour], theme.background)
  );
  if (accessibleColour != null) {
    return theme[accessibleColour];
  }
  return theme[titleColours[0]];
};

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
