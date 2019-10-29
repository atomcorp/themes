/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('request');
const fs = require('fs');
const path = require('path');
const requestPromise = require('request-promise-native');

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

const schemaJson = [];

request(FILES_PATH, options, (err, response, body) => {
  Promise.all(
    body.map((file) => {
      return requestPromise(
        `${RAW_PATH}${file.name}`,
        options,
        (err, response, body) => {
          schemaJson.push(body);
        }
      );
    })
  ).then(() => {
    fs.writeFileSync(
      path.join('public', 'colour-schemes.json'),
      JSON.stringify(schemaJson, null, 2)
    );
  });
});
