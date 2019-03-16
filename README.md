# Emojli Mobile

This branch is a simple Expo-based mobile app wrapping the Emojli API.

[![Get it on Google Play](https://play.google.com/intl/en_us/badges/images/badge_new.png)](https://play.google.com/store/apps/details?id=com.phpizza.emojli)

It's not yet available on iOS because I can't be bothered to give Apple $100/yr for this joke app :stuck_out_tongue:. If I eventually get a personal Apple Developer Account, I'll release it there too.

## Developing

Expo provides a development server included in our npm dependencies:

```bash
npm ci
npm run start
```

For more detail on how to use it, see [docs.expo.io](https://docs.expo.io/versions/latest/). Expo also allows you to publish your releasese publicly, and build final .apk and .ipa files for submitting to app stores with a simple CLI.

## Publishing

You're free to use `expo publish` to re-publish this app (and any changes you've made) to Expo, and even build final apps if you'd like.

### Sentry

The current `app.json` defines a Sentry integration with my personal account. If you plan on publishing yourself, you should fork the repo and change the `sentry.hooks.postPublish` and `expo.extra.sentryDsn` values to match your Sentry project. Note that uploading source maps also requires `SENTRY_AUTH_TOKEN` to be set in your `.env` with the current configuration.
