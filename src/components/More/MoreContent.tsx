import React from 'react';

import css from './More.module.css';

type MoreSectionProps = {
  heading: string;
};

const MoreSection: React.FC<MoreSectionProps> = (props) => {
  return (
    <div className={css.section}>
      <div className={css.heading}>{props.heading}</div>
      {props.children}
    </div>
  );
};

const MoreContent = (props: {
  isMoreOpen: boolean;
  downloadAllThemes: () => void;
}) => (
  <section
    className={css.content}
    style={{display: props.isMoreOpen ? 'block' : 'none'}}
    id="more"
    aria-hidden={!props.isMoreOpen}
  >
    <MoreSection heading="Download all themes">
      <p>
        Get all the themes as one big json file, warning: not as useful as it
        sounds{' '}
        <span role="img" aria-label="person shrugging">
          🤷‍♀️
        </span>
      </p>
      <button onClick={props.downloadAllThemes}>
        Download .json of themes
      </button>
    </MoreSection>
    <MoreSection heading="How to use">
      <p>
        For how to use the themes see the{' '}
        <a href="https://github.com/atomcorp/themes#how-to-use-the-themes">
          help section on GitHub
        </a>
      </p>
    </MoreSection>
    <MoreSection heading="Credit">
      <p>
        Most themes come from{' '}
        <a href="https://github.com/mbadolato/iTerm2-Color-Schemes">
          iTerm2 Color Schemes
        </a>
        , so huge thanks to them!
      </p>
      <p>
        Also big thanks to those that have contributed themes directly,{' '}
        <a href="https://github.com/atomcorp/themes#credits">
          credits on GitHub
        </a>
      </p>
    </MoreSection>
    <MoreSection heading="GitHub">
      <p>
        Check out the{' '}
        <a href="https://github.com/atomcorp/themes">Windows Terminal Themes</a>{' '}
        repository on GitHub
      </p>
    </MoreSection>
    <MoreSection heading="Tips">
      <p>
        You can use keyboard shorcuts, A for previous theme, D for next theme.
      </p>
      <p>
        The site should be fully accessible too,{' '}
        <a href="https://github.com/atomcorp/themes/issues">
          please open an issue if you notice a problem
        </a>
      </p>
    </MoreSection>
  </section>
);

export default MoreContent;
