import React from 'react';

import css from './Code.module.css';

type CodeProps = {
  theme: string;
};

const Code: React.FC<CodeProps> = (props) => {
  return (
    <section>
      <textarea
        className={css.textarea}
        onFocus={(e) => {
          e.target.select();
        }}
        value={props.theme}
        /* onChange just supresses a React console warning */
        onChange={() => {}}
      />
    </section>
  );
};

export default Code;
