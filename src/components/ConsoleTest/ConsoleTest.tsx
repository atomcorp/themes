import React, {useState} from 'react';

import css from './ConsoleTest.module.css';
import {themeType, textKeyType, themeShadeType} from 'types';
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
    <section className={css.container}>
      <div className={css.terminal}>
        <div
          className={`${css.titlebar} ${!props.theme.isDark ? css.light : ''}`}
        >
          <div className={css.tabs}>
            {codeblocks.map((codeblock) => (
              <div
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
                  onClick={() => {
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
          className={css.code}
          style={{
            color: props.theme[(props.theme, activeCodeblock.defaultColour)],
          }}
        >
          {parseSyntax(props.theme, activeCodeblock.markup)}
        </code>
      </div>
    </section>
  );
};

export default ConsoleTest;
