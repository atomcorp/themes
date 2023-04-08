import React from 'react';

import {Logo} from 'Icons';

import css from './Skeleton.module.css';

const Skeleton = (): JSX.Element => (
  <section className={css.container}>
    <h1>
      <Logo
        size="48px"
        colours={['#8adbb4', '#d7af87', '#c79ec4']}
        className={css.logo}
      />
      Windows Terminal Themes
    </h1>
    <h4>Loading...</h4>
  </section>
);

export default Skeleton;
