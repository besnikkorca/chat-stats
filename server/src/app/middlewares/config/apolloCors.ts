import { CLIENT_URL, PLAYGROUND_URL } from 'config/index';

const apolloCorsConfig = {
  origin: [CLIENT_URL, PLAYGROUND_URL, 'https://studio.apollographql.com'],
  credentials: true,
};

export default apolloCorsConfig;
