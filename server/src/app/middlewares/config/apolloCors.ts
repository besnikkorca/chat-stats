import { CLIENT_URL } from 'config/index';

const apolloCorsConfig = {
  origin: [CLIENT_URL, 'https://studio.apollographql.com'],
  credentials: true,
};

export default apolloCorsConfig;
