# Windows Terminal Themes API

Runs an API endpoint with all the themes needed by [atomcorp.github.io/themes/](https://atomcorp.github.io/themes/). Also runs a cron-job to refresh the list once a day.

## Run

`yarn start`

Requires GitHub personal access token (get it from [https://github.com/settings/tokens](https://github.com/settings/tokens)), create a file .env.private and add `GITHUB_TOKEN=YOUR_PERSONAL_ACCESS_TOKEN` to it.
