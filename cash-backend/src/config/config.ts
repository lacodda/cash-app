import { join } from 'path';
import { readFileSync } from 'fs';

export default () => ({
  port: parseInt(process.env.SERVER_PORT || '3000', 10),
  globalPrefix: process.env.SERVER_GLOBAL_PREFIX,
});

export const getAppOptions = () => ({
  httpsOptions: {
    key: readFileSync(join(__dirname, '../../ssl/ssl.key')),
    cert: readFileSync(join(__dirname, '../../ssl/ssl.crt')),
  },
  cors: true,
});

export const envFilePath = join(
  __dirname,
  `../../.env.${process.env.NODE_ENV}`,
);
