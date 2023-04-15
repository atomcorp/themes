import css from './ChalkExample.module.css';

import colorCss from '@/components/CurrentColorScheme/CurrentColorScheme.module.css';
import {CSSProperties} from 'react';

const modifiers = [
  // 'reset',
  'none',
  'bold',
  'dim',
  'underline',
  'inverse',
  'strikethrough',
];

const colors = [
  'black',
  'brightBlack',
  'red',
  'brightRed',
  'green',
  'brightGreen',
  'yellow',
  'brightYellow',
  'blue',
  'brightBlue',
  'purple',
  'brightPurple',
  'cyan',
  'brightCyan',
  'white',
  'brightWhite',
];

interface StyleProps extends CSSProperties {
  '--color'?: string;
}

const ChalkExample = () => {
  return (
    <figure>
      <figcaption>Chalk example</figcaption>
      <div className={css.container}>
        {modifiers.map((modifier) => (
          <span key={modifier}>{modifier}</span>
        ))}
      </div>
      {/* colors with modification */}
      <div className={css.container}>
        {colors.map((color) =>
          modifiers.map((modifier) => (
            <span
              key={modifier}
              className={`${colorCss[color]} ${colorCss[modifier]}`}
              style={
                {
                  '--color':
                    modifier === 'inverse' ? `var(--${color})` : undefined,
                } as StyleProps
              }
            >
              {color}
            </span>
          ))
        )}
      </div>
      {/* with background */}
      <div className={css.container}>
        {colors.map((color) =>
          modifiers.map((modifier) => (
            <span
              key={modifier}
              className={`${colorCss.foreground} ${colorCss[modifier]} ${colorCss['background-color']}`}
              style={
                {
                  '--color': `var(--${color})`,
                } as StyleProps
              }
            >
              {color}
            </span>
          ))
        )}
      </div>
    </figure>
  );
};

export default ChalkExample;
