import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, beforeAll, it } from '@jest/globals';
import { SystemSecuredStorage } from '../services/system-secured-storage.service';

describe('Syncronous system secured storage', () => {
  let systemSecuredStorage: SystemSecuredStorage;
  const TESTING_DATA: string = 'Testing text !@#$%^&*()_+';
  const fileName = 'data.encrypted';

  beforeAll(() => {
    systemSecuredStorage = new SystemSecuredStorage({
      directory: __dirname,
      encryptionKey: 'de746182415c1a57acaa6e53b6eeb66be0c4d13cb6206d6a1dabf29422fe5581',
      ivKey: 'a5cf58ee1df1343334a5ec799c237256',
    });
  });

  it('Should store the encrypted data in a file locally.', () => {
    systemSecuredStorage.storeData('key', TESTING_DATA);

    const isFileStorageExists = existsSync(resolve(__dirname, fileName));

    expect(isFileStorageExists).toBeDefined();
  });

  it(`Should retrieve data in key 'key' from the encrypted storage.`, () => {
    const data = systemSecuredStorage.retrieveData<typeof TESTING_DATA>('key');

    expect(data).toBeDefined();
    expect(data).toEqual(TESTING_DATA);
  });

  it(`Retrieving data in a non-existing key 'abc' should be undefined.`, () => {
    const data = systemSecuredStorage.retrieveData<typeof TESTING_DATA>('abc');

    expect(data).toBeUndefined();
  });

  it('Should retrieve all the data from the storage.', () => {
    const storageData = systemSecuredStorage.retrieveAll();

    expect(storageData).toBeDefined();
    expect(typeof storageData).toBe('object');
    expect(Object.keys(storageData as object)).toContain('key');
  });

  it(`Should delete data stored in 'key'.`, () => {
    systemSecuredStorage.deleteData('key');

    const data = systemSecuredStorage.retrieveData('key');

    expect(data).toBeUndefined();
  });

  it('Should reset the storage by clearing it.', () => {
    systemSecuredStorage.storeData('key', TESTING_DATA);

    systemSecuredStorage.reset();

    const storageData = systemSecuredStorage.retrieveAll();

    expect(storageData).toBeUndefined();
  });
});
