import fs from 'fs';
import { type Menu } from '../types';

export const readJSON = (path: string): Menu[] => {
  const json = fs.readFileSync(path, 'utf8');
  const data = JSON.parse(json);

  return data;
};
