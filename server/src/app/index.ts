import express from 'express';
import { PORT } from '../../config';
import applyRoutes from './routes';

const app = express();

app.use(express.json());

applyRoutes(app);

const server = app.listen({ port: PORT }, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});

export default server;
