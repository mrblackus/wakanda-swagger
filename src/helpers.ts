import * as fs from 'fs';

/**
 * Read file content asynchronously
 * @param {string} pathFile
 * @return {Promise}
 */
export function getFileContent(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject('Please provide a file path to read');
    }

    fs.access(filePath, fs.F_OK, err => {
      if (err) {
        reject('Invalid file path');
      }

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject('An error occured while reading the file');
        }

        resolve(data);
      });
    });
  });
}
