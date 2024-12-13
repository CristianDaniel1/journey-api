import fs from 'fs';

export const readJSON = (path: string) => {
  const json = fs.readFileSync(path, 'utf8');
  const data = JSON.parse(json);

  return data;
};
