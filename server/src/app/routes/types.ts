import { Router } from 'express';
import { BaseRoute } from './constants';

export type RouterData = [basePath: BaseRoute, router: Router];
