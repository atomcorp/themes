![Preview of the Windows Terminal Themes](https://github.com/atomcorp/themes/raw/master/public/preview-console.png)

# Windows Terminal Themes

Preview and copy themes for the new [Windows Terminal (Preview)](https://github.com/microsoft/terminal).

Use the project at [https://atomcorp.github.io/themes/](https://atomcorp.github.io/themes/)

## How to use the themes

This site let's you copy a theme you like (or download a json file with all of them).

The [official docs for Windows Terminal](https://github.com/microsoft/terminal/blob/master/doc/user-docs/UsingJsonSettings.md) seem to very thoroughly explain how to change the settings, but essentially:

- open Window Preview settings
- add your chosen theme(s) to `schemes`
- in `profiles`, find the shell you're using (eg cmd, powershell, ubuntu) and replace `colorScheme` with the name of the theme
- 🥳

## Contribute a theme

Ideally for the ecosystem new themes should be proposed to [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) (where most of these themes come from), then everyone can benefit.

If not, new themes can be add added with a pull request. Just add them to the list in `src/custom-colour-schemes.json`. You shouldn't need to run anything.

## Running

Install using `yarn start`.

Develop with [cypress](https://www.cypress.io/) using `yarn cy:open` and run tests with `yarn cy:run`. Jest is also set up, `yarn test`.

To run in development, you also need to run [github.com/atomcorp/terminal-api](https://github.com/atomcorp/terminal-api).

### Compiling the themes

The json list is generated from another repo, [github.com/atomcorp/terminal-api](https://github.com/atomcorp/terminal-api). It merges all the schemes found in the [iTerm2-Color-Schemes/windowsterminal](https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/windowsterminal) using the GitHub API, then combines it with `src/custom-colour-schemes.json` in this repo. It runs on a server with a cron job that runs this once a day.

## Todo

- ~~a way to share themes~~
- ~~testing with [cypress](https://www.cypress.io/)~~
- ~~automating the compilation step~~
- ~~improve responsiveness~~
- ~~add a codeblock view~~
- nicer UI

## Notes

- Most themes are copied from [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) so huge thanks and credit to them and all the theme designers
- aims are to be simple and accessible
- this project is based around: React (create-react-app), TypeScript, Node, Github Pages, immer and CSS Grid
- the following projects were really useful [clipboard-polyfill](https://github.com/lgarron/clipboard-polyfill), [resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill), [file-saver](https://github.com/eligrey/FileSaver.js) and [get-contrast](https://github.com/johno/get-contrast). Thanks!
