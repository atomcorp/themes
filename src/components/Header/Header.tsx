import React from 'react';

import css from './Header.module.css';

const Header: React.FC = () => (
  <>
    <h1 className={css.title}>Windows Terminal Themes</h1>
    <p className={css.paragraph}>
      Themes for{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701"
      >
        Windows Terminal (Preview)
      </a>
      . To add new themes, open up settings (profile.json), copy a theme into
      schemes and then reference the name in profiles.
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
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`${process.env.REACT_APP_PUBLIC_PATH}/colour-schemes.json`}
      >
        Download all the themes
      </a>
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
