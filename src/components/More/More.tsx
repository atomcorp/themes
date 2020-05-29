import React, {useState} from 'react';

import {Chevron} from 'Icons';

import css from './More.module.css';
// https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
const Info = () => {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className={css.trigger}
        aria-controls="more"
        aria-haspopup="true"
        aria-expanded={open}
      >
        More{' '}
        <Chevron
          colour={getComputedStyle(document.documentElement).getPropertyValue(
            '--toolbar__color'
          )}
        />
      </button>
      <section className={css.content} id="more" aria-hidden={!open}>
        <div>
          <h3>Download</h3>
          <p>
            Get all the themes as one big json file, warning: not as useful as
            it sounds 🤷‍♀️
          </p>
          <button>Download all the themes</button>
        </div>
        <div>
          <h3>How to use</h3>
          <p>
            For how to use the themes see the{' '}
            <a href="https://github.com/atomcorp/themes#how-to-use-the-themes">
              help section on GitHub
            </a>
          </p>
        </div>
        <div>
          <h3>Credit</h3>
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
        </div>
        <div>
          <h3>GitHub</h3>
          <p>
            Check out the{' '}
            <a href="https://atomcorp.github.io/themes/">
              Windows Terminal Themes
            </a>{' '}
            repository on GitHub
          </p>
        </div>
        <div>
          <h3>Tips</h3>
          <p>
            You can use keyboard shorcuts, A for previous theme, D for next
            theme.
          </p>
          <p>
            The site should be fully accessible too,{' '}
            <a href="https://github.com/atomcorp/themes/issues">
              please open an issue if notice a problem
            </a>
          </p>
        </div>
      </section>
    </section>
  );
};

export default Info;
