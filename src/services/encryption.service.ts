import { createCipheriv, createDecipheriv } from 'node:crypto';

/**
 * The service use 'aes-256-ctr' aes algorithm by default.
 *
 * @exports
 * @class EncryptionService
 */
export class EncryptionService {
  private key: Buffer;
  private iv: Buffer;
  private readonly algorithm: string = 'aes-256-ctr';

  /**
   * Create an instance of the encrytion service.
   *
   * @param {string} key - The AES encryption key.
   * @param {string} iv - The iv key.
   */
  constructor(key: string, iv: string) {
    this.key = Buffer.from(key);
    this.iv = Buffer.from(iv);
  }

  /**
   * Encrypt data.
   *
   * @param {data} data - The data to be encrypted.
   * @returns {string} - Encrypted data.
   */
  encrypt(data: any): string {
    const stringifiedData = JSON.stringify(data);
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    return cipher.update(stringifiedData, 'utf8', 'hex') + cipher.final('hex');
  }

  /**
   * Decrypt data.
   *
   * @param {string} encryptedData - The encrypted data.
   * @returns {T} - The decrypted data.
   */
  decrypt<T = any>(encryptedData: string): T {
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    return JSON.parse(decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8')) as T;
  }
}
