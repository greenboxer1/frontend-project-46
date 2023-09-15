import _ from 'lodash';
import { getDataFromPath, getPath } from './util.js';

const genDiff = (path1, path2) => {
  const data1 = getDataFromPath(getPath(path1));
  const data2 = getDataFromPath(getPath(path2));
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.map((key) => {
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return { key, type: 'edited', value: [data1[key], data2[key]] };
    }
    return { key, type: 'unchanged', value: data2[key] };
  });

  const renderDiff = (diff) => {
    const render = diff.reduce((acc, piece) => {
      const { key } = piece;
      const { value } = piece;
      let rendered;
      switch (piece.type) {
        case 'deleted':
          rendered = `  - ${key}: ${value}\n`;
          break;
        case 'added':
          rendered = `  + ${key}: ${value}\n`;
          break;
        case 'edited':
          rendered = `  - ${key}: ${value[0]}\n  + ${key}: ${value[1]}\n`;
          break;
        default:
          rendered = `    ${key}: ${value}\n`;
      }
      return acc + rendered;
    }, '');
    return `{\n${render}}`;
  };

  return renderDiff(diff);
};

export default genDiff;
