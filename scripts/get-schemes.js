/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('request');
const fs = require('fs');
const path = require('path');
const requestPromise = require('request-promise-native');
const customSchemaJson = require('../src/custom-colour-schemes.json');

const options = {
  json: true,
  headers: {
    'User-Agent': 'atomcorp',
  },
};

// get all the file names from the directory
const FILES_PATH =
  'https://api.github.com/repos/mbadolato/iTerm2-Color-Schemes/contents/windowsterminal';
// this is just an easier way of downloading the raw data than the API stuff
const RAW_PATH =
  'https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/windowsterminal/';

const iTerm2SchemaJson = [];

request(FILES_PATH, options, (err, response, body) => {
  Promise.all(
    body.map((file) =>
      requestPromise(
        `${RAW_PATH}${file.name}`,
        options,
        (err, response, body) => {
          iTerm2SchemaJson.push(body);
        }
      )
    )
  ).then(() => {
    const combinedSchemaJson = [...iTerm2SchemaJson, ...customSchemaJson].sort(
      (a, b) => {
        return a.name > b.name ? 1 : -1;
      }
    );
    fs.writeFileSync(
      path.join('public', 'colour-schemes.json'),
      JSON.stringify(combinedSchemaJson, null, 2)
    );
  });
});
