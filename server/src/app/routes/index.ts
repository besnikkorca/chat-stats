import { Express } from 'express';
import PerformanceRouter from './PerformanceRouter';
import { RouterData } from './types';

const routers: RouterData[] = [PerformanceRouter];

export default function applyRoutes(app: Express): void {
  routers.forEach(([basePath, router]) => app.use(basePath, router));
}
