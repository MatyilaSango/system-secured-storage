import { writeFile, readFile, writeFileSync, readFileSync } from 'node:fs';

const fileName = 'data.encrypted';

/**
 * Save data locally asynchronously.
 *
 * @param {string} directory - The directory to save the file.
 * @param {string} data - The data to be saved.
 * @param {void} callback - The callback function
 * @returns
 */
export const saveDataLocallyAsync = (directory: string, data: string, callback: (error: any) => void) => {
  const path = directory.concat('/', fileName);

  return writeFile(path, JSON.stringify(data), callback);
};

/**
 * Save data locally synchronously.
 *
 * @param {string} directory - The directory to save the file.
 * @param {string} data - The data to be saved.
 * @returns
 */
export const saveDataLocallySync = (directory: string, data: string) => {
  const path = directory.concat('/', fileName);

  return writeFileSync(path, JSON.stringify(data));
};

/**
 * Retrieve data locally asynchronously.
 *
 * @param {string} directory - The directory the data saved in.
 * @param {void} callback - Callback function.
 * @returns
 */
export const retrieveDataLocallyAsync = (directory: string, callback: (error: any | null, data: any) => void) => {
  try {
    const path = directory.concat('/', fileName);

    return readFile(path, { encoding: 'utf-8' }, (error, data) => {
      if (error || !data) callback(error, undefined);
      else callback(error, JSON.parse(data));
    });
  } catch (error) {
    callback(error, undefined);
  }
};

/**
 * Retrieve data locally synchronously.
 *
 * @param {string} directory - The directory the data saved in.
 * @returns
 */
export const retrieveDataLocallySync = (directory: string) => {
  try {
    const path = directory.concat('/', fileName);

    return JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
  } catch (error) {
    return undefined;
  }
};
