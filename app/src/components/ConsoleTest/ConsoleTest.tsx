import React, {useState} from 'react';

import css from './ConsoleTest.module.css';
import {themeType} from 'types';
import codeblocks, {codeblocksType} from './codeblocks';
import {parseSyntax} from './methods';

type PropsType = {
  theme: themeType;
};

const defaultCodeblock: codeblocksType = {
  defaultColour: 'foreground',
  markup: '',
  id: 'default',
  name: 'default',
};

const ConsoleTest: React.FC<PropsType> = (props) => {
  const [tab, setTab] = useState(codeblocks[0].id);
  const activeCodeblock =
    codeblocks.find((codeblock) => codeblock.id === tab) ?? defaultCodeblock;
  return (
    <section className={css.container} data-testid="consoletest">
      <div
        className={`${css.terminal}  ${
          !props.theme.meta.isDark ? css.light : ''
        }`}
      >
        <div className={css.titlebar}>
          <div className={css.tabs}>
            {codeblocks.map((codeblock) => (
              <div
                key={codeblock.id}
                className={`${css.tab} ${
                  tab === codeblock.id ? css.active : ''
                }`}
              >
                <input
                  className={css.radio}
                  id={codeblock.id}
                  name="tab"
                  type="radio"
                  value={codeblock.id}
                  checked={codeblock.id === activeCodeblock.id}
                  onChange={() => {
                    setTab(codeblock.id);
                  }}
                />
                <label htmlFor={codeblock.id}>
                  <span>{codeblock.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <code
          data-testid="markup"
          className={css.code}
          style={{
            color: props.theme[(props.theme, activeCodeblock.defaultColour)],
          }}
        >
          {parseSyntax(props.theme, activeCodeblock.markup)}
        </code>
        {Array.isArray(props.theme.meta.credits) && (
          <div className={css.footer} data-testid="credit">
            {props.theme.name} credit{' '}
            {props.theme.meta.credits.map((credit, i) => (
              <a key={i} href={credit.link}>
                {credit.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ConsoleTest;
