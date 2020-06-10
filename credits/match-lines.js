const fs = require('fs');

const themes = require('../server/themes.json');
const themenames = themes.map((theme) => theme.name);
const buffer = fs.readFileSync('credits/original.md');
const markdownCredits = buffer.toString();

const credits = themenames.map((themename) => {
  const note = markdownCredits.match(new RegExp(`(.+)${themename}(.+)`, 'i'));
  return {
    theme: themename,
    notes: note != null ? note[0] : 'notfound',
  };
});

fs.writeFileSync('credits/credits.json', JSON.stringify(credits, null, 2));
