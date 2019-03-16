require('dotenv').config();

module.exports = async options => {
  await require('sentry-expo/upload-sourcemaps')(options);
};
