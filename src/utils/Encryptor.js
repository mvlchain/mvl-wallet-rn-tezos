import { NativeModules } from 'react-native';

const Aes = NativeModules.Aes;

/**
 * Class that exposes two public methods: Encrypt and Decrypt
 * This is used by the KeyringController to encrypt / decrypt the state
 * which contains sensitive seed words and addresses
 */
export default class Encryptor {
  key = null;

  _generateSalt(byteCount = 32) {
    const view = new Uint8Array(byteCount);
    global.crypto.getRandomValues(view);
    return btoa(String.fromCharCode.apply(null, view));
  }

  _generateKey = (password, salt) => Aes.pbkdf2(password, salt, 5000, 256);

  _keyFromPassword = (password, salt) => this._generateKey(password, salt);

  _encryptWithKey = async (text, keyBase64) => {
    const iv = await Aes.randomKey(16);
    return Aes.encrypt(text, keyBase64, iv, 'aes-256-cbc').then((cipher) => ({ cipher, iv }));
  };

  _decryptWithKey = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc');

  /**
   * Encrypts a JS object using a password (and AES encryption with native libraries)
   *
   * @param {string} password - Password used for encryption
   * @param {object} object - Data object to encrypt
   * @returns - Promise resolving to stringified data
   */
  encrypt = async (password, object) => {
    const salt = this._generateSalt(16);
    const key = await this._keyFromPassword(password, salt);
    const result = await this._encryptWithKey(JSON.stringify(object), key);
    result.salt = salt;
    result.lib = 'original';
    return JSON.stringify(result);
  };

  /**
   * Decrypts an encrypted JS object (encryptedString)
   * using a password (and AES decryption with native libraries)
   *
   * @param {string} password - Password used for decryption
   * @param {string} encryptedString - String to decrypt
   * @returns - Promise resolving to decrypted data object
   */
  decrypt = async (password, encryptedString) => {
    const encryptedData = JSON.parse(encryptedString);
    const key = await this._keyFromPassword(password, encryptedData.salt);
    const data = await this._decryptWithKey(encryptedData, key);
    return JSON.parse(data);
  };
}
