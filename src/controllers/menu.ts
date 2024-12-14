import { Request, Response } from 'express';
import { MenuModel } from '../models/menu';
import { validateMenu, validatePartialMenu } from '../schemas/menu';

export class MenuController {
  public getAllMenu = async (req: Request, res: Response): Promise<any> => {
    const { category } = req.query;

    const categ = typeof category === 'string' ? category : undefined;

    const menu = await MenuModel.getAllMenu({ category: categ });

    return res.json(menu);
  };

  public getMenuById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const menuItem = await MenuModel.getMenuById({ id });

    if (!menuItem)
      return res
        .status(404)
        .json({ message: `Menu item with id ${id} not found` });

    return res.json(menuItem);
  };

  public createMenu = async (req: Request, res: Response): Promise<any> => {
    const result = validateMenu(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMenuItem = await MenuModel.createMenu({ menuItem: result.data });

    return res.status(201).json(newMenuItem);
  };

  public updateMenu = async (req: Request, res: Response): Promise<any> => {
    const result = validatePartialMenu(req.body);

    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const { id } = req.params;

    const updatedMenuItem = await MenuModel.updateMenu({
      id,
      menuItem: result.data,
    });

    if (!updatedMenuItem)
      return res
        .status(404)
        .json({ message: `Menu item with id ${id} not found` });

    return res.json(updatedMenuItem);
  };

  public deleteMenu = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const menuItemExists = await MenuModel.deleteMenu({ id });

    if (!menuItemExists)
      return res
        .status(404)
        .json({ message: `Menu item with id ${id} not found` });

    return res.json({ message: 'Menu item deleted' });
  };
}
