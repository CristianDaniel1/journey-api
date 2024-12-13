import { Request, Response } from 'express';
import { readJSON } from '../utils/readJson';

export class MenuController {
  static async getAllMenu(req: Request, res: Response): Promise<any> {
    const menu = await readJSON('menu.json');
    console.log(menu);

    return res.json(menu);
  }
}
