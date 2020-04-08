import React, {useState} from 'react';
import * as clipboard from 'clipboard-polyfill';

import {themeType} from 'types';
import css from './Console.module.css';
import {backgroundKeys, textKeys, parseValidKeys} from './consoleMethods';

type PropsType = {
  theme?: themeType;
  primaryColour: string;
  backgroundColour: string;
};

const Console: React.FC<PropsType> = (props) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
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
      <div className={css.buttons}>
        <button
          data-text={copied ? 'Copied!' : 'Copy Theme'}
          className={`${css.button}${copied ? ` ${css.copied}` : ''}`}
          style={{
            color: props.theme.background,
            background: props.primaryColour,
          }}
          onClick={() => {
            if (!copied && props.theme) {
              setCopied(true);
              clipboard.writeText(
                JSON.stringify(parseValidKeys(props.theme), null, 2)
              );
              setTimeout(() => {
                setCopied(false);
              }, 500);
            }
          }}
        >
          Copy Theme
        </button>
        <button
          data-text={shared ? 'Copied!' : 'Share Theme'}
          className={`${css.button} ${css.share} ${
            shared ? ` ${css.copied}` : ''
          }`}
          style={{
            color: props.primaryColour,
            borderColor: props.primaryColour,
            background: props.theme.background,
          }}
          onClick={() => {
            if (!shared) {
              setShared(true);
              setTimeout(() => {
                setShared(false);
              }, 500);
            }
          }}
        >
          Share theme
        </button>
      </div>
    </section>
  );
};

export default Console;
