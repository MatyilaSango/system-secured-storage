import { writeFile, readFile, writeFileSync, readFileSync } from 'node:fs';

const fileName = 'data.encrypted';

/**
 * Save data locally asynchronously.
 *
 * @param {string} directory - The directory to save the file.
 * @param {string} data - The data to be saved.
 * @returns
 */
export const saveDataLocallyAsync = async (directory: string, data: string) => {
  const path = directory.concat('/', fileName);

  return writeFile(path, JSON.stringify(data), () => {});
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
 * @param {void} callback - Callback fucntion
 * @returns
 */
export const retrieveDataLocallyAsync = async (
  directory: string,
  callback: (error: any | null, data: string) => void
) => {
  const path = directory.concat('/', fileName);

  return readFile(path, { encoding: 'utf-8' }, callback);
};

/**
 * Retrieve data locally synchronously.
 *
 * @param {string} directory - The directory the data saved in.
 * @returns
 */
export const retrieveDataLocallySync = (directory: string) => {
  const path = directory.concat('/', fileName);

  return readFileSync(path, { encoding: 'utf-8' });
};
