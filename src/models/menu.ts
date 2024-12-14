import { randomUUID } from 'node:crypto';
import { Menu } from '../types';
import { readJSON } from '../utils/readJson';

const menu = readJSON('./menu.json');

export class MenuModel {
  static async getAllMenu({
    category,
  }: {
    category?: string;
  }): Promise<Menu[]> {
    if (category) {
      return menu.filter(
        item => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    return menu;
  }

  static async getMenuById({ id }: { id: string }): Promise<Menu | undefined> {
    const menuItem = menu.find(item => item.id === id);

    return menuItem;
  }

  static async createMenu({ menuItem }: { [key: string]: any }): Promise<Menu> {
    const newMenuItem = {
      id: randomUUID(),
      ...menuItem,
    };

    menu.push(newMenuItem);

    return newMenuItem;
  }

  static async updateMenu({
    id,
    menuItem,
  }: {
    id: string;
    [key: string]: any;
  }): Promise<Menu | boolean> {
    const menuItemIndex = menu.findIndex(item => item.id === id);

    if (menuItemIndex === -1) return false;

    menu[menuItemIndex] = {
      ...menu[menuItemIndex],
      ...menuItem,
    };

    return menu[menuItemIndex];
  }

  static async deleteMenu({ id }: { id: string }): Promise<boolean> {
    const menuItemIndex = menu.findIndex(item => item.id === id);

    if (menuItemIndex === -1) return false;

    menu.splice(menuItemIndex, 1);

    return true;
  }
}
