# Encrypted Key-Value Storage with Node.js

A Node.js package that allows users to store encrypted key-value data locally on their system. This project serves as an alternate storage solution to SQLite but with enhanced security features, leveraging AES encryption to ensure the confidentiality and integrity of the stored data.

## Features

- Store key-value data locally on the system in an encrypted format.
- Use of AES encryption to secure the data.
- A simple and secure alternative to SQLite for local storage needs.
- Easy-to-use API for data storage and retrieval.

## How It Works

The project uses AES encryption to secure the data before storing it locally on the user's system. The key-value pairs are stored in a file, and the data is encrypted using a secret key. The secret key is not stored in the project, ensuring that only authorized users with the correct key can decrypt the data.

## AES Encryption

AES (Advanced Encryption Standard) is used to securely encrypt and decrypt the data before saving and retrieving it from the local storage. This ensures that the stored data cannot be easily read or tampered with.

## Usage

#### Options

| Property name | type   | required | Description                                                       |
| ------------- | ------ | -------- | ----------------------------------------------------------------- |
| directory     | string | true     | The directory to save/retrive the data from/to.                   |
| encryptionKey | string | true     | The AES encryption key. The key can be 128, 192, or 256 bits long |
| ivKey         | string | true     | The AES iv key.                                                   |

### Generating encryption and iv keys

You can generate these keys using online services or with the use of node package `crypto`.

They can be generated using cli.

```
// Using node
> node

// Genarate random string for the `encryption` key - 64 Characters
> require('crypto').randomBytes(64).toString('hex')

// Genarate random string for the `iv` key - 32 Characters
> require('crypto').randomBytes(32).toString('hex')
```

Make sure to store your keys somewhere safely.

### Using system-secure-storage

Create an instance of the system-secure-storage with your desired `options`.

```
import SystemSecuredStorage from 'system-secured-storage';

const storage = new SystemSecuredStorage(options)
```

#### Storing Data

To store a key-value pair securely, use the `storeData` method:

```
// Encrypt and store the key-value pair
storage.storeData('myKey', 'mySensitiveData');
```

#### Retrieving Data

To retrieve the decrypted data:

```
// Retrieve and decrypt the data using the key
const decryptedData = storage.retrieveData('myKey');

```
