import { describe, expect, beforeAll, it } from '@jest/globals';
import { EncryptionService } from '../services/encryption.service';

describe('Encryption service', () => {
  let encryptionService: EncryptionService;
  const TESTING_DATA: string = 'Testing text !@#$%^&*()_+';
  let encryptedData: string;

  beforeAll(() => {
    encryptionService = new EncryptionService(
      'de746182415c1a57acaa6e53b6eeb66be0c4d13cb6206d6a1dabf29422fe5581',
      'a5cf58ee1df1343334a5ec799c237256'
    );
  });

  it('Should encrypt passed argument to encrypted hex value.', () => {
    encryptedData = encryptionService.encrypt(TESTING_DATA);

    const isHexadecimal = /^[a-fA-F0-9]+$/.test(encryptedData);

    expect(encryptedData).toBeDefined();
    expect(isHexadecimal).toBe(true);
  });

  it('Should decrypt the encrypted test data to its original form.', () => {
    const decryptedData = encryptionService.decrypt<typeof TESTING_DATA>(encryptedData);

    expect(decryptedData).toBeDefined();
    expect(decryptedData).toEqual(TESTING_DATA);
  });
});
