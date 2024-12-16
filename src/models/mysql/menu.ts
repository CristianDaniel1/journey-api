import mysql, {
  ConnectionOptions,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';
import { Menu as MenuType } from '../../types';

import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from '../../config/envs';

type Menu = MenuType & RowDataPacket;

const config: ConnectionOptions = {
  host: MYSQL_HOST,
  user: MYSQL_USER,
  port: MYSQL_PORT,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  decimalNumbers: true,
};

export class MenuModel {
  static async getAllMenu({
    category,
  }: {
    category: string | undefined;
  }): Promise<Menu[]> {
    try {
      const connection = await mysql.createConnection(config);

      const sql = `SELECT BIN_TO_UUID(m.id) id, m.name, m.price, m.alt, m.image, c.name as category, m.rating 
          FROM menu AS m JOIN category_menu AS c ON c.id = m.category`;

      if (category) {
        const lowerCaseCateg = category.toLowerCase();

        const [categMenu] = await connection.query<Menu[]>(
          `${sql} WHERE LOWER(c.name) = ?;`,
          [lowerCaseCateg]
        );

        if (categMenu.length === 0) return [];

        return categMenu;
      }

      const [menu] = await connection.query<Menu[]>(`${sql};`);

      return menu;
    } catch (error) {
      throw new Error('Error on sending menu');
    }
  }

  static async getMenuById({ id }: { id: string }): Promise<Menu> {
    try {
      const connection = await mysql.createConnection(config);

      const [menu] = await connection.query<Menu[]>(
        `SELECT BIN_TO_UUID(m.id) id, m.name, m.price, m.alt, m.image, c.name AS category, m.rating FROM menu AS m 
        JOIN category_menu AS c ON c.id = m.category WHERE m.id = UUID_TO_BIN(?);`,
        [id]
      );

      return menu[0];
    } catch (error) {
      throw new Error('Error getting menu by id');
    }
  }

  static async createMenu({ menuItem }: { [key: string]: any }): Promise<Menu> {
    try {
      const connection = await mysql.createConnection(config);

      const { name, price, alt, image, category: oldCateg, rating } = menuItem;

      const [uuidResult]: any = await connection.query('SELECT UUID() uuid;');

      const [categ]: any = await connection.query(
        'SELECT id FROM category_menu WHERE name = ?;',
        [oldCateg]
      );

      const [{ uuid }] = uuidResult;
      const [{ id: category }] = categ;

      await connection.query(
        `INSERT INTO menu (id, name, price, alt, image, category, rating) 
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, name, price, alt, image, category, rating]
      );

      const [newMenuItem] = await connection.query<Menu[]>(
        `SELECT BIN_TO_UUID(m.id) id, m.name, m.price, m.alt, m.image, c.name AS category, m.rating 
        FROM menu AS m JOIN category_menu AS c ON c.id = m.category WHERE m.id = UUID_TO_BIN(?);`,
        [uuid]
      );

      return newMenuItem[0];
    } catch (error) {
      throw new Error('Error creating menu');
    }
  }

  static async updateMenu({
    id,
    menuItem,
  }: {
    id: string;
    [key: string]: any;
  }): Promise<Menu | boolean> {
    try {
      const connection = await mysql.createConnection(config);
      const sqlUpdate = 'UPDATE menu SET';
      const sqlParams = '= ? WHERE id = UUID_TO_BIN(?);';

      const { name, price, alt, image, category: oldCateg, rating } = menuItem;

      if (oldCateg) {
        const [categ]: any = await connection.query(
          'SELECT id FROM category_menu WHERE name = ?;',
          [oldCateg]
        );

        const [{ id: category }] = categ;

        await connection.query(`${sqlUpdate} category ${sqlParams}`, [
          category,
          id,
        ]);
      }

      name &&
        (await connection.query(`${sqlUpdate} name ${sqlParams}`, [name, id]));

      price &&
        (await connection.query(`${sqlUpdate} price ${sqlParams}`, [
          price,
          id,
        ]));

      alt &&
        (await connection.query(`${sqlUpdate} alt ${sqlParams}`, [alt, id]));

      image &&
        (await connection.query(`${sqlUpdate} image ${sqlParams}`, [
          image,
          id,
        ]));

      rating &&
        (await connection.query(`${sqlUpdate} rating ${sqlParams}`, [
          rating,
          id,
        ]));

      const [newMenuItem] = await connection.query<Menu[]>(
        `SELECT BIN_TO_UUID(m.id) id, m.name, m.price, m.alt, m.image, c.name AS category, m.rating 
        FROM menu AS m JOIN category_menu AS c ON c.id = m.category WHERE m.id = UUID_TO_BIN(?);`,
        [id]
      );

      return newMenuItem[0];
    } catch (error) {
      throw new Error('Error updating menu');
    }
  }

  static async deleteMenu({ id }: { id: string }): Promise<boolean> {
    try {
      const connection = await mysql.createConnection(config);

      const [result] = await connection.query<ResultSetHeader>(
        `DELETE FROM menu WHERE id = UUID_TO_BIN(?);`,
        [id]
      );

      if (result.affectedRows === 0) return false;

      return true;
    } catch (error) {
      throw new Error('Error deleting menu');
    }
  }
}
