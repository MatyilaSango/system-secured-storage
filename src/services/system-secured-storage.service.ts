import { SystemSecuredStorageOptions } from '../types/types';
import {
  retrieveDataLocallyAsync,
  retrieveDataLocallySync,
  saveDataLocallyAsync,
  saveDataLocallySync,
} from '../utils/save-file.util';
import { EncryptionService } from './encryption.service';

/**
 * Securely store data on you system.
 *
 * @exports
 * @class SystemSecuredStorage
 *
 * ```
 * // Example
 * import SystemSecuredStorage from 'system-secured-storage';
 *
 * const storage = new SystemSecuredStorage(options)
 *
 * // Encrypt and store the key-value pair
 * storage.storeData('myKey', 'mySensitiveData');
 *
 * // Retrieve and decrypt the data using the key
 * const decryptedData = storage.retrieveData('myKey');
 * ```
 */
export class SystemSecuredStorage {
  private fileDirectory: string;
  private encryptionService: EncryptionService;

  /**
   * Create an instance of the SystemSecuredStorage.
   *
   * @param {SystemSecuredStorageOptions} options - Options
   */
  constructor({ directory, encryptionKey, ivKey }: SystemSecuredStorageOptions) {
    this.fileDirectory = directory;
    this.encryptionService = new EncryptionService(encryptionKey, ivKey);
  }

  /**
   * Retrieve all stored data.
   *
   * @returns
   */
  retrieveAll = <T = { [key: string]: any }>() => {
    const encryptedData = retrieveDataLocallySync(this.fileDirectory);

    if (!encryptedData) return undefined;

    return this.encryptionService.decrypt<T>(encryptedData);
  };

  /**
   * Asynchronously retrieve all stored data.
   *
   * @returns
   */
  retrieveAllAsync = async <T = { [key: string]: any }>(callback: (error: any | null, data: T | undefined) => void) => {
    return await retrieveDataLocallyAsync(this.fileDirectory, (error, data) => {
      if (error) callback(error, undefined);
      else callback(null, this.encryptionService.decrypt<T>(data));
    });
  };

  /**
   * Encrypt data.
   *
   * @param storedData - The stored data locally.
   * @param {string} key - The key of the data to add.
   * @param {string} data - The data.
   * @returns
   */
  private encryptData = (storedData: { [key: string]: any } | undefined, key: string, data: any) => {
    const _storedData = storedData ? { ...storedData, [key]: data } : { [key]: data };

    return this.encryptionService.encrypt(_storedData);
  };

  /**
   * Store data.
   *
   * @param {string} key - The key.
   * @param {string} data - The data.
   */
  storeData(key: string, data: any) {
    const storedData = this.retrieveAll();

    const encryptedData = this.encryptData(storedData, key, data);

    saveDataLocallySync(this.fileDirectory, encryptedData);
  }

  /**
   * Asynchronously store data.
   *
   * @param {string} key - The key.
   * @param {string} data - The data.
   */
  async storeDataAsync(key: string, data: any) {
    await this.retrieveAllAsync(async (err, storedData) => {
      if (err) return;

      const encryptedData = this.encryptData(storedData, key, data);

      await saveDataLocallyAsync(this.fileDirectory, encryptedData);
    });
  }

  /**
   * Retrieve store data.
   *
   * @param {string} key - The key the data stored in.
   * @returns {T} The data stored.
   */
  retrieveData<T>(key: string): T | undefined {
    const storedData = this.retrieveAll();

    if (!storedData) return undefined;

    return storedData[key] as T;
  }

  /**
   * Asynchronously retrieve store data.
   *
   * @param {string} key - The key the data stored in.
   * @returns {T} The data stored.
   */
  async retriveDataAsync<T>(key: string, callback: (error: any | null, data: T | undefined) => void): Promise<void> {
    await this.retrieveAllAsync((err, storedData) => {
      if (err || !storedData) callback(err, undefined);
      else callback(null, storedData[key] as T);
    });
  }
}
