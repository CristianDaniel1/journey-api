import { Router } from 'express';
import { MenuRoutes } from './menu';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/menu', MenuRoutes.routes);

    return router;
  }
}
