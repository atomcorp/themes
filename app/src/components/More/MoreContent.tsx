import React from 'react';

import css from './More.module.css';

type MoreSectionProps = {
  heading: string;
};

const MoreSection: React.FC<MoreSectionProps> = (props) => {
  return (
    <div className={css.section}>
      <div className={css.heading}>{props.heading}</div>
      <hr className={css.hr} />
      {props.children}
    </div>
  );
};

type MoreContentProps = {
  downloadAllThemes: () => void;
};

const MoreContent = (props: MoreContentProps): JSX.Element => (
  <section data-testid="morecontent" className={css.container} id="more">
    <MoreSection heading="Download">
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
    <MoreSection heading="Help">
      <p>
        For how to use the themes see the{' '}
        <a href="https://github.com/atomcorp/themes#how-to-use-the-themes">
          help section of this repo
        </a>
        .
      </p>
      <p>
        See also the{' '}
        <a href="https://github.com/microsoft/terminal/blob/master/doc/user-docs/UsingJsonSettings.md">
          Windows Terminal settings official docs
        </a>
        .
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
        .
      </p>
    </MoreSection>
    <MoreSection heading="Contribute">
      <p>
        New themes are very welcome! To add a new theme to this site either:{' '}
      </p>
      <ul>
        <li>
          add it through{' '}
          <a href="https://github.com/mbadolato/iTerm2-Color-Schemes#contribute">
            iTerm2 Color Schemes
          </a>{' '}
          (preferable, it will automatically be used here)
        </li>
        <li>
          or through a pull request to this site&apos;s repo{' '}
          <a href="https://github.com/atomcorp/themes#contribute-a-theme">
            Windows Terminal Themes
          </a>
        </li>
      </ul>
    </MoreSection>
    <MoreSection heading="GitHub">
      <p>
        Star, Fork or file an issue at the{' '}
        <a href="https://github.com/atomcorp/themes">Windows Terminal Themes</a>{' '}
        repository on GitHub.
      </p>
    </MoreSection>
    <MoreSection heading="Tips">
      <p>
        You can use keyboard shorcuts, <span className={css.key}>A</span> for
        previous theme, <span className={css.key}>D</span> for next theme.
      </p>
      <p>
        The site should be fully accessible too,{' '}
        <a href="https://github.com/atomcorp/themes/issues">
          please open an issue if you notice a problem
        </a>
        .
      </p>
    </MoreSection>
  </section>
);

export default MoreContent;
