import path from 'path';
import dotenv from 'dotenv';

const ENV_FILE = '.env.example.docker';

// dotenv.config needs to be called at the top
dotenv.config({ path: path.join(__dirname, ENV_FILE) });
