import { CLIENT_URL } from 'config/index';

const PREFLIGHT_MAX_AGE = 600;

const corsConfig = {
  origin: [CLIENT_URL, 'https://studio.apollographql.com'],
  credentials: true,
  maxAge: PREFLIGHT_MAX_AGE,
  exposedHeaders: ['*', 'Authorization'],
};

export default corsConfig;
