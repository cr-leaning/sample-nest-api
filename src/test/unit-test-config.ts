import dotenv from 'dotenv';
import { existsSync } from 'fs';

const envFilePaths = [`../.env.${process.env.NODE_ENV}`, '../.env'];

for (const envFile of envFilePaths) {
  if (existsSync(envFile)) {
    dotenv.config({ path: envFile });
  }
}
