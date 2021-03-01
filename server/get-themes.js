/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const got = require('got');
const fs = require('fs');
const contrast = require('get-contrast');

if (process.env.CI !== true) {
  require('custom-env').env('private');
}

const btoa = (str) => Buffer.from(str, 'binary').toString('base64');
const options = {
  headers: {
    'User-Agent': 'Windows Terminal Themes',
    Authorization: `Basic ${btoa(`atomcorp:${process.env.GITHUB_TOKEN}`)}`,
    Accept: 'application/vnd.github.v3.raw',
  },
};
const baseUrl =
  'https://api.github.com/repos/mbadolato/iTerm2-Color-Schemes/contents/windowsterminal/';
// this will always get the freshest committed custom schemes
const customSchemesUrl =
  'https://api.github.com/repos/atomcorp/themes/contents/app/src/custom-colour-schemes.json';
const creditsUrl =
  'https://api.github.com/repos/atomcorp/themes/contents/app/src/credits.json';
const manualCreditsUrl =
  'https://api.github.com/repos/atomcorp/themes/contents/credits/manual-credits.json';

// add boolean whether the theme is a light or dark
const addThemeMeta = (themes, credits) => {
  return themes.map((theme) => {
    const themeCredit = credits.find((credit) =>
      credit.themeNames.includes(theme.name)
    );
    return {
      ...theme,
      meta: {
        isDark: contrast.ratio(theme.background, '#000') < 8,
        credits: themeCredit !== undefined ? themeCredit.sources : null,
      },
    };
  });
};

const main = async (isDev) => {
  try {
    // get the custom file in the terminal repo
    let customSchemaJson;
    let credits;
    let manualCredits;
    if (isDev) {
      customSchemaJson = require('../app/src/custom-colour-schemes.json');
      credits = require('../app/src/credits.json');
      manualCredits = require('../credits/manual-credits.json');
    } else {
      const customSchemaRes = await got({...options, url: customSchemesUrl});
      customSchemaJson = JSON.parse(customSchemaRes.body);
      const creditsUrlRes = await got({...options, url: creditsUrl});
      credits = JSON.parse(creditsUrlRes.body);
      const manualCreditsRes = await got({...options, url: manualCreditsUrl});
      manualCredits = JSON.parse(manualCreditsRes.body);
    }
    // get the list of scheme names in the iterm2 repo directory
    const dirResponse = await got(baseUrl, options);
    const files = JSON.parse(dirResponse.body);
    // use those names to download each of the scheme pages
    const fileResponses = await Promise.all(
      files.map((file) => got({...options, url: `${baseUrl}${file.name}`}))
    );
    // turn into the JSON
    const iTerm2SchemaJson = fileResponses.map((fileResponse) =>
      JSON.parse(fileResponse.body)
    );
    // merge with any themes that have been added in this project
    const combinedSchemaJson = addThemeMeta(
      [...iTerm2SchemaJson, ...customSchemaJson],
      [...credits, ...manualCredits]
    ).sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1));
    // write the new file
    fs.writeFileSync(
      './themes.json',
      JSON.stringify(combinedSchemaJson, null, 2)
    );
    // write log
    const now = new Date();
    fs.appendFileSync(
      'log.txt',
      `date: ${now.toLocaleDateString()}
total themes: ${iTerm2SchemaJson.length + customSchemaJson.length}
=======
`
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = main;
