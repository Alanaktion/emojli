import uploadSourcemaps from 'sentry-expo/upload-sourcemaps';
import dotenv from 'dotenv';

dotenv.config();

export default async options => {
  await uploadSourcemaps(options);
};
