import React from 'react';

import css from './Header.module.css';

const Header: React.FC = () => (
  <section className={css.container}>
    <h1 className={css.title}>Windows Terminal Themes</h1>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/mbadolato/iTerm2-Color-Schemes"
    >
      via iTerm2 Color Schemes
    </a>
    {' | '}
    <a target="_blank" href="/colour-schemes.json">
      Download all
    </a>
  </section>
);

export default Header;
