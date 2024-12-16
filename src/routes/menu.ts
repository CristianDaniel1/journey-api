import { Router } from 'express';
import { MenuController } from '../controllers/menu';
import { MenuModel } from '../models/mysql/menu';
// import { MenuModel } from '../models/local-file-system/menu';

export class MenuRoutes {
  static get routes(): Router {
    const router = Router();

    const menuController = new MenuController(MenuModel);

    router.get('/', menuController.getAllMenu);
    router.post('/', menuController.createMenu);

    router.get('/:id', menuController.getMenuById);
    router.patch('/:id', menuController.updateMenu);
    router.delete('/:id', menuController.deleteMenu);

    return router;
  }
}
