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
        <ol>
          <li>open Windows Terminal settings</li>
          <li>add your chosen theme(s) to schemes</li>
          <li>
            in profiles, find the shell you&apos;re using (eg cmd, powershell,
            ubuntu) and replace colorScheme with the name of the theme
          </li>
        </ol>
      </p>
      <p>
        See also{' '}
        <a href="https://github.com/microsoft/terminal/blob/master/doc/user-docs/UsingJsonSettings.md">
          Windows Terminal settings official docs
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
    <MoreSection heading="Contribute">
      <p>
        Add a new theme to this site. Either (and preferably) through{' '}
        <a href="https://github.com/mbadolato/iTerm2-Color-Schemes#contribute">
          contribute to iTerm2 Color Schemes
        </a>
        , or through a pull request to this site&apos;s repo{' '}
        <a href="https://github.com/atomcorp/themes#contribute-a-theme">
          contribute to Windows Terminal Themes
        </a>
      </p>
    </MoreSection>
    <MoreSection heading="GitHub">
      <p>
        Star, Fork or file an issue at the{' '}
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
