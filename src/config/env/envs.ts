import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PORT_DB: get('PORT_DB').required().asPortNumber(),
  USER_DB: get('USER_DB').required().asString(),
  PASSWORD_DB: get('PASSWORD_DB').required().asString(),
  DATABASE_DB: get('DATABASE_DB').required().asString(),
  HOST: get('HOST').required().asString(),
};
