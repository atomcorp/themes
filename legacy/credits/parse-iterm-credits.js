/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const themes = require('../server/themes.json');
const themenames = themes.map((theme) => theme.name);
const buffer = fs.readFileSync('credits/iterm-credits.md');
const markdownCredits = buffer.toString();

const notFound = [];

const credits = themenames.reduce((acc, themename) => {
  const note = markdownCredits.match(new RegExp(`(.+) ${themename}(.+)`, 'i'));
  let matches = [];
  if (note != null) {
    matches = [...note[0].matchAll(/\[(.+?)\]\((.+?)\)/g)];
  }
  if (matches.length === 0) {
    notFound.push(themename);
    return acc;
  }
  if (matches.length === 1) {
    const existingSourceIndex = acc.findIndex(
      (credit) =>
        credit.sources[0].name === matches[0][1] &&
        credit.sources[0].link === matches[0][2]
    );
    if (existingSourceIndex !== -1) {
      acc[existingSourceIndex].themeNames.push(themename);
      return acc;
    }
  }
  return [
    ...acc,
    {
      themeNames: [themename],
      sources: matches.map((match) => ({
        name: match != null ? match[1] : undefined,
        link: match != null ? match[2] : undefined,
      })),
      notes: note != null ? note[0] : 'notfound',
    },
  ];
}, []);

fs.writeFileSync('credits/auto-credits.json', JSON.stringify(credits, null, 2));
fs.writeFileSync('credits/notFound.json', JSON.stringify(notFound, null, 2));
