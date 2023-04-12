import chalk from 'chalk';
// import styles from 'ansi-styles';

const styles = [
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'strikethrough',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
];

// const chalkTest = styles.forEach((style) => {
//   let text = style;
//   if (/^bg/.test(style)) {
//     text = chalk.black(style);
//   }
//   if (/magenta/.test(style)) {
//     text = 'purple';
//   }
//   if (/gray/.test(style)) {
//     text = 'blackBright';
//   }
//   process.stdout.write(chalk[style](text) + ' ');
// });

// colour | reset | bold | dim | italic | underline | inverse | hidden | strikethrough | visible
// red
// black

const modifiers = [
  'reset',
  'bold',
  'dim',
  // 'italic',
  'underline',
  'inverse',
  // 'hidden',
  'strikethrough',
  // 'visible',
];

const foregrounds = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
];

const backgrounds = [
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
];

const colLength = 15;

const tableHeader = modifiers.forEach((modifier) => {
  let spaces = '';
  if (colLength > modifier.length) {
    const lengthDiff = colLength - modifier.length;
    spaces = ' '.repeat(lengthDiff);
  }
  process.stdout.write(chalk[modifier]['magenta'](modifier) + spaces + ' | ');
});

process.stdout.write('\n');

foregrounds.forEach((foreground) => {
  modifiers.forEach((modifier) => {
    let spaces = '';
    if (colLength > foreground.length) {
      const lengthDiff = colLength - foreground.length;
      spaces = ' '.repeat(lengthDiff);
    }
    process.stdout.write(
      chalk[modifier][foreground](foreground) + spaces + ' | '
    );
  });
  process.stdout.write('\n');
});

backgrounds.forEach((background) => {
  modifiers.forEach((modifier) => {
    let spaces = '';
    if (colLength > background.length) {
      const lengthDiff = colLength - background.length;
      spaces = ' '.repeat(lengthDiff);
    }
    process.stdout.write(
      chalk[modifier][background](chalk.black(background)) + spaces + ' | '
    );
  });
  process.stdout.write('\n');
});
