import React from 'react';
import {saveAs} from 'file-saver';

import themeJson from 'colour-schemes.json';
import css from './Header.module.css';

type PropTypes = {
  primaryColour: string;
};

const themeBlob = new Blob([JSON.stringify(themeJson, null, 2)], {
  type: 'application/json',
});

const Header: React.FC<PropTypes> = (props) => (
  <>
    <h1 style={{color: props.primaryColour}} className={css.title}>
      Windows Terminal Themes
    </h1>
    <p className={css.paragraph}>
      Themes for{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701"
      >
        Windows Terminal (Preview)
      </a>
    </p>
    <p className={css.paragraph}>
      For how to use the themes see the{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/atomcorp/themes#how-to-use-the-themes"
      >
        help section on GitHub
      </a>
    </p>
    <p className={css.paragraph}>
      The themes come from{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/mbadolato/iTerm2-Color-Schemes"
      >
        iTerm2 Color Schemes
      </a>
      , so thanks to them.
    </p>
    <p className={css.paragraph}>
      <button
        className={css.download}
        onClick={() => {
          saveAs(themeBlob, 'windows-terminal-themes.json', {autoBom: true});
        }}
      >
        Download all the themes
      </button>
      {' | '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/atomcorp/themes"
      >
        Github page
      </a>
    </p>
  </>
);

export default Header;
