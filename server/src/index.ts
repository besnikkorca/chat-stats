import '../config';
import express from 'express';
import { PORT } from '../config';

const app = express();

app.listen({ port: PORT }, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
