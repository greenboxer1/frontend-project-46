import fs from 'fs';
import path from 'path';

const getPath = (file) => path.resolve(process.cwd(), file);

const getDataFromPath = (path) => JSON.parse(fs.readFileSync(path), 'utf-8');

export { getPath, getDataFromPath };
