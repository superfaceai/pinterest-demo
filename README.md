# Pinterest Demo

This is a bare-bones demo of Superface integrations with Pinterest:

- [oauth2/refresh-token](https://superface.ai/oauth2/refresh-token)
- [social-media/publishing-profiles](https://superface.ai/social-media/publishing-profiles)
- [social-media/publish-post](https://superface.ai/social-media/publish-post)

## Setup

1. `npm i`
2. `cp .env.example .env`
3. set Pinterest credentials in .env file (see below)
4. get Access and Refresh tokens (see below)

### Pinterest app and application setup

You need to obtain Pinterest application ID and secret. We recommend to try the demo with a dedicated testing Pinterest business account.

- request a trial account according to [Pinterest documentation](https://developers.pinterest.com/docs/api/v5/#section/Requesting-Trial-Access)
- once your request is approved (mind that you may not get any notification), visit Manage section of your app in [My apps](https://developers.pinterest.com/apps/)
- add the following Redirect URI: `http://localhost:3000/auth/pinterest/callback`
- copy "App id" and "App secret key" into the `.env` file

### Obtaining Access and Refresh tokens

This repository contains an HTTP server which implements OAuth authorization flow. Upon successful authorization, it will output the tokens in a JSON string, stored in `tokens.json` file:

1. Run `npm start`
2. Visit `http://localhost:3000`
3. Authorize application to access your account
4. The `tokens.json` file should be created

Alternatively run `get-tokens.js` script and paste the generated JSON manually.

### Run demo scripts

```shell
node scripts/publishing-profiles.js # get publishing profiles (user's boards)

node scripts/publish-post.js "your tweet text" # publish post (pin)
```
