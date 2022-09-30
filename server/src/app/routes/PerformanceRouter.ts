import { Router } from 'express';
import PerformanceController from '../controllers/PerformanceController';
import { BaseRoute, PerformanceRoute } from './constants';
import { RouterData } from './types';

const router = Router({ mergeParams: true });

router.get(PerformanceRoute.test, PerformanceController.test);

export default [BaseRoute.performance, router] as RouterData;
