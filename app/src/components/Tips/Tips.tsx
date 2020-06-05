import React from 'react';

import css from './Tips.module.css';

const Tips = () => (
  <section>
    <div>Pro tip</div>
    <div>
      Press <span className={css.key}>A</span> and{' '}
      <span className={css.key}>D</span> to change themes
    </div>
  </section>
);

export default Tips;
