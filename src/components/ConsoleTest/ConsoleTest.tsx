import React from 'react';

import css from './ConsoleTest.module.css';
import {themeType, validKeysType, textKeyType} from 'types';
import {validKeys} from 'components/ThemePreview/consoleMethods';

type PropsType = {
  theme: themeType;
};
type codeblocksType = {
  [key: string]: {
    name: string;
    markup: string;
    defaultColour: textKeyType | 'foreground' | 'background';
  };
};

const setParseSyntax = (theme: themeType) => (markup: string) => {
  console.log(markup.split(/(<[^/>]+?>[^<]+<[^>]+?>)/g));
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
      console.log(matches);
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

const codeblocks: codeblocksType = {
  craCompiled: {
    name: 'Create React App compiled',
    markup: `
    <green>Compiled successfully!</green>

    You can now view terminal in the browser. Local:
    http://localhost:3000/themes On Your Network:
    http://192.168.86.37:3000/themes Note that the development build is not
    optimized. 

    To create a production build, use
    <cyan>yarn build</cyan>.`,
    defaultColour: 'white',
  },
  cypressTest: {
    name: 'Cypress',
    markup: `
    <foreground>Running:</foreground>  <brightBlack>themes.spec.js                           (1 of 1)</brightBlack>


    <foreground>Windows Terminal Themes - big screen</foreground>
    <cyan>- should download all themes using download button</cyan>
    <green>√</green> should show dark theme by default <red>(705ms)</red>
    
    <green>(</green><brightGreen>Results</brightGreen><green>)</green>

    ┌──────────────────────────────────────────────────────────┐
    │ Tests:        <green>18</green>                                         │
    │ Duration:     <green>10 seconds</green>                                 │
    │ Spec Ran:     <green>themes.spec.js</green>                             │
    └──────────────────────────────────────────────────────────┘
    `,
    defaultColour: 'brightBlack',
  },
  jestFailed: {
    name: 'Jest: failed test',
    markup: `
    <foreground:brightRed> FAIL </foreground:brightRed> src/components/Home/Home.test.js (<white:red>17.523s</white:red>)
      <red>● should return theme name from search params</red>
  
      expect(<red>received</red>).toBe(<green>expected</green>) // Object.is equality
  
        Expected: <green>"synthwave-everything</green><background:brightGreen>error"</background:brightGreen>
        Received: <red>"synthwave-everything"</red>
    
          218 |
          219 | it(<green>'should return theme name from search params'</green>, () <yellow>=></yellow> {
        > 220 |   expect(returnInitialTheme(<brightGreen>'?theme=synthwave-everything'</brightGreen>)).toBe(
              |                                                             ^
          221 |     <green>'synthwave-everythingerror'</green>
          222 |   );
          223 |   expect(returnInitialTheme(<green>'?wrong=synthwave-everything'</green>)).toBe(<cyan>null</cyan>);
        
          at Object.toBe (<cyan>src/components/Home/Home.test.js</cyan>:220:61)
  
    Test Suites: <brightRed>1 failed</brightRed>, <brightGreen>1 passed</brightGreen>, 2 total
    Tests:       <brightRed>1 failed</brightRed>, <brightYellow>4 skipped</brightYellow>, <brightGreen>2 passed</brightGreen>, 7 total
    Snapshots:   0 total
    Time:        <brightYellow>22.5s</brightYellow>
    Ran all test suites.

    Watch Usage: Press w to show more.
    `,
    defaultColour: 'white',
  },
  jestRunning: {
    name: 'Jest - running',
    markup: `
    <white:brightYellow>  RUNS  </white:brightYellow> src/components/Home/Home.test.js
    <white:brightYellow>  RUNS  </white:brightYellow>  src/App.test.tsx
    
    Test Suites: 0 of 2 total
    Tests:       0 total
    Snapshots:   0 total
    Time:        4s
    <background:green>         </background:green><background:foreground>                             </background:foreground>

    `,
    defaultColour: 'foreground',
  },
};

const ConsoleTest: React.FC<PropsType> = (props) => {
  const parseSyntax = setParseSyntax(props.theme);

  return (
    <section>
      <div className={css.titlebar}>Title bar, tabs, close</div>
      <code
        className={css.code}
        style={{color: props.theme[codeblocks.cypressTest.defaultColour]}}
      >
        {parseSyntax(codeblocks.cypressTest.markup)}
      </code>
    </section>
  );
};

export default ConsoleTest;
