import * as fs from 'fs';

import {HTTPVerb} from './http-verb';

/**
 * Read file content asynchronously
 * @param {string} pathFile
 * @return {Promise}
 */
export function getFileContent(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject('Please provide a file path to read');
      return;
    }

    fs.access(filePath, fs.F_OK, err => {
      if (err) {
        reject('Invalid file path');
        return;
      }

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject('An error occured while reading the file');
          return;
        }

        resolve(data);
      });
    });
  });
}

export function writeInFile(path: string, content: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, err => {
      if (err) {
        reject(err);
      }
      else {
        resolve(true);
      }
    });
  })
}

export function HTTPVerbToString(verb: HTTPVerb): string {
  switch(verb) {
    case HTTPVerb.GET:
      return 'get';
    case HTTPVerb.POST:
      return 'post';
    case HTTPVerb.PUT:
      return 'put';
    case HTTPVerb.DELETE:
      return 'delete';
    default:
      throw new Error('Uknown HTTP verb');
  }
}