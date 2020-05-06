import React from 'react';

import css from './ConsoleTest.module.css';
import {themeType, validKeysType, textKeyType} from 'types';
type PropsType = {
  theme: themeType;
};
type codeblocksType = {
  [key: string]: {
    name: string;
    markup: string;
    defaultColour: textKeyType;
  };
};

const setParseSyntax = (theme: themeType) => (markup: string) => {
  return markup.split(/(<.+?>.+<\/.+>)/g).map((string) => {
    const matches = [...string.matchAll(/<(.+?)>(.+)<\/(.+)>/g)][0];
    if (matches != null) {
      const colour = matches[1] as textKeyType;
      const contents = matches[2];
      return <span style={{color: theme[colour]}}>{contents}</span>;
    }
    return string;
  }, []);
};

const codeblocks: codeblocksType = {
  craCompiled: {
    name: 'Create React App compiled',
    markup: `
    <green>Compiled successfully!</green>

    You can now view terminal in the browser. Local:
    http://localhost:3000/themes On Your Network:
    http://192.168.86.37:3000/themes Note that the development build is not
    optimized. 

    To create a production build, use{' '}
    <cyan>yarn build</cyan>.`,
    defaultColour: 'white',
  },
};

const ConsoleTest: React.FC<PropsType> = (props) => {
  const parseSyntax = setParseSyntax(props.theme);

  return (
    <section>
      <div className={css.titlebar}>Title bar, tabs, close</div>
      <code
        className={css.code}
        style={{color: props.theme[codeblocks.craCompiled.defaultColour]}}
      >
        {parseSyntax(codeblocks.craCompiled.markup)}
      </code>
    </section>
  );
};

export default ConsoleTest;
