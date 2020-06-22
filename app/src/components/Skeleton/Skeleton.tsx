import React from 'react';

import css from './Skeleton.module.css';

const Skeleton = (): JSX.Element => (
  <section className={css.container}>
    <h1>Windows Terminal Themes</h1>
    <h4>Loading...</h4>
  </section>
);

export default Skeleton;
