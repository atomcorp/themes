import React, {useState} from 'react';
import * as clipboard from 'clipboard-polyfill';

import {themeType} from 'types';
import css from './Console.module.css';
import {backgroundKeys, textKeys} from './consoleMethods';

type PropsType = {
  theme?: themeType;
  primaryColour: string;
  backgroundColour: string;
};

const Console: React.FC<PropsType> = (props) => {
  const [textCopied, setTextCopied] = useState(false);
  if (!props.theme) {
    return (
      <div
        style={{background: props.backgroundColour, color: props.primaryColour}}
        className={css.loading}
      >
        Loading...
      </div>
    );
  }
  return (
    <section
      className={css.container}
      style={{background: props.backgroundColour}}
    >
      <h2
        data-testid="selected-title"
        className={css.name}
        style={{color: props.primaryColour}}
      >
        {props.theme.name}
      </h2>
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
      <button
        className={css.button}
        style={{color: props.theme.background, background: props.primaryColour}}
        onClick={() => {
          if (!textCopied) {
            setTextCopied(true);
            clipboard.writeText(JSON.stringify(props.theme, null, 2));
            setTimeout(() => {
              setTextCopied(false);
            }, 500);
          }
        }}
      >
        {!textCopied ? 'Copy Theme' : 'Copied!'}
      </button>
    </section>
  );
};

export default Console;
