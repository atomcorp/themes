import css from './ChalkExample.module.css';
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

const ChalkExample = () => {
  return (
    <figure>
      <figcaption>Chalk example</figcaption>
      <div className={css.container}>
        {modifiers.map((modifier) => (
          <span key={modifier}>{modifier}</span>
        ))}
      </div>
      <div className={css.container}>
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

export default ChalkExample;
