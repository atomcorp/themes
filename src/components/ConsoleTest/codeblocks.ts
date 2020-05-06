import {textKeyType} from 'types';

type codeblocksType = {
  name: string;
  markup: string;
  defaultColour: textKeyType | 'foreground' | 'background';
}[];

const codeblocks: codeblocksType = [
  {
    name: 'Create React App compiled',
    markup: `<green>Compiled successfully!</green>
You can now view terminal in the browser. Local:
http://localhost:3000/themes On Your Network:
http://192.168.86.37:3000/themes Note that the development build is not
optimized. 
To create a production build, use <cyan>yarn build</cyan>.`,
    defaultColour: 'white',
  },
  {
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
  {
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
  {
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
];

export default codeblocks;
