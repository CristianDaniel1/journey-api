import { Router } from 'express';
import { MenuController } from '../controllers/menu';

export class MenuRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/', MenuController.getAllMenu);

    return router;
  }
}
