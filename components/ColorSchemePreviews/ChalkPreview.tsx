import {VisuallyHidden} from '@radix-ui/react-visually-hidden';

import css from './ChalkPreview.module.css';
import getStyle from '@/components/ColorSchemePreviews/getStyle';

const modifiers = [
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

const ChalkPreview = () => {
  return (
    <figure className={css.container}>
      <figcaption>
        <VisuallyHidden>
          Various combinations of the the active color schemes colors and
          modifiers
        </VisuallyHidden>
      </figcaption>
      <div className={css.chalk}>
        {modifiers.map((modifier) => (
          <span key={modifier}>{modifier}</span>
        ))}
        {colors.map((color) =>
          modifiers.map((modifier) => (
            <span key={modifier} style={getStyle(color, {[modifier]: true})}>
              {color}
            </span>
          ))
        )}
      </div>
    </figure>
  );
};

export default ChalkPreview;
