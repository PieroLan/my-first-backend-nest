import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PORT_DB: get('PORT_DB').required().asPortNumber(),
  USER: get('USER').required().asString(),
  PASSWORD: get('PASSWORD').required().asString(),
  DATABASE: get('DATABASE').required().asString(),
  HOST: get('HOST').required().asString()
};
