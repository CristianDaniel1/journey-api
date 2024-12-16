import { Request, Response } from 'express';
import { validateMenu, validatePartialMenu } from '../schemas/menu';

export class MenuController {
  constructor(private readonly menuModel: any) {}

  public getAllMenu = async (req: Request, res: Response): Promise<any> => {
    try {
      const { category } = req.query;

      const categ = typeof category === 'string' ? category : undefined;

      if (
        categ &&
        categ !== 'dish' &&
        categ !== 'drink' &&
        categ !== 'dessert'
      ) {
        return res.status(400).json({
          message: 'Invalid category, category must be dish, drink or dessert',
        });
      }

      const menu = await this.menuModel.getAllMenu({ category: categ });

      return res.json(menu);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  public getMenuById = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      const menuItem = await this.menuModel.getMenuById({ id });

      if (!menuItem)
        return res
          .status(404)
          .json({ message: `Menu item with id ${id} not found` });

      return res.json(menuItem);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  public createMenu = async (req: Request, res: Response): Promise<any> => {
    try {
      const result = validateMenu(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const newMenuItem = await this.menuModel.createMenu({
        menuItem: result.data,
      });

      return res.status(201).json(newMenuItem);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  public updateMenu = async (req: Request, res: Response): Promise<any> => {
    try {
      const result = validatePartialMenu(req.body);

      if (!result.success)
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });

      const { id } = req.params;

      const updatedMenuItem = await this.menuModel.updateMenu({
        id,
        menuItem: result.data,
      });

      if (!updatedMenuItem)
        return res
          .status(404)
          .json({ message: `Menu item with id ${id} not found` });

      return res.json(updatedMenuItem);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  public deleteMenu = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      const menuItemExists = await this.menuModel.deleteMenu({ id });

      if (!menuItemExists)
        return res
          .status(404)
          .json({ message: `Menu item with id ${id} not found` });

      return res.json({ message: 'Menu item deleted' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}
