import React from 'react';

import css from './ConsoleTest.module.css';
import {themeType, textKeyType} from 'types';
import {validKeys} from 'components/ThemePreview/consoleMethods';
import codeblocks from './codeblocks';

type PropsType = {
  theme: themeType;
};

const setParseSyntax = (theme: themeType) => (markup: string) => {
  return markup.split(/(<[^/>]+?>[^<]+<[^>]+?>)/g).map((string, i) => {
    const matches = [...string.matchAll(/<(.+?)>(.+)<\/(.+)>/g)][0];
    if (matches != null) {
      if (process.env.NODE_ENV === 'development' && matches[1] !== matches[3]) {
        throw new Error(
          `Opening tag <${matches[1]}> does not match closing tag </${matches[3]}>`
        );
      }
      const colours = matches[1].split(':');
      const foreground = colours[0] as textKeyType;
      const background =
        colours.length > 0 ? (colours[1] as textKeyType) : null;
      if (
        process.env.NODE_ENV === 'development' &&
        (!validKeys.includes(foreground) ||
          (background && !validKeys.includes(background)))
      ) {
        throw new Error(
          `Using invalid tags: <${matches[1]}>${matches[2]}</${matches[3]}>`
        );
      }
      const contents = matches[2];
      return (
        <span
          key={i}
          style={{
            color: theme[foreground],
            background: background ? theme[background] : undefined,
          }}
        >
          {contents}
        </span>
      );
    }
    return string;
  }, []);
};

const ConsoleTest: React.FC<PropsType> = (props) => {
  const parseSyntax = setParseSyntax(props.theme);

  return (
    <section className={css.container}>
      <div className={css.terminal}>
        <div className={css.titlebar}>Title bar, tabs, close</div>
        <code
          className={css.code}
          style={{color: props.theme[codeblocks[0].defaultColour]}}
        >
          {parseSyntax(codeblocks[0].markup)}
        </code>
      </div>
    </section>
  );
};

export default ConsoleTest;
