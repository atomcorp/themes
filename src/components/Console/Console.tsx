import React, {useState} from 'react';
import clipboard from 'clipboard-polyfill';

import {themeType} from 'types';
import css from './Console.module.css';
import {backgroundKeys, textKeys, getRandomColour} from './consoleMethods';

type PropsType = {
  theme?: themeType;
};

const Console: React.FC<PropsType> = (props) => {
  const [textCopied, setTextCopied] = useState(false);
  if (!props.theme) {
    return <div>Loading...</div>;
  }
  const randomColour = getRandomColour(props.theme);
  return (
    <section
      className={css.container}
      style={{background: props.theme.background}}
    >
      <h2 className={css.name} style={{color: randomColour}}>
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
      <button
        className={css.button}
        style={{color: props.theme.background, background: randomColour}}
        onClick={() => {
          if (!textCopied) {
            setTextCopied(true);
            clipboard.writeText(JSON.stringify(props.theme, null, 2));
            setTimeout(() => {
              setTextCopied(false);
            }, 1000);
          }
        }}
      >
        {!textCopied ? 'Copy Theme' : 'Copied!'}
      </button>
    </section>
  );
};

export default Console;
