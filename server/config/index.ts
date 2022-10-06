const DEFAULT_PORT = 80;
const DEFAULT_DB_URL = 'postgres://postgres@localhost:5432/zettablock';
const DEFAULT_JWT_SECRET = 'Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt';
const DEFAULT_CLIENT_URL = 'http://localhost/graphql';

const {
  JWT_SECRET = DEFAULT_JWT_SECRET,
  DATABASE_URL = DEFAULT_DB_URL,
  PORT = DEFAULT_PORT,
  CLIENT_URL = DEFAULT_CLIENT_URL,
} = process.env;

export { DATABASE_URL, PORT, JWT_SECRET, CLIENT_URL };
