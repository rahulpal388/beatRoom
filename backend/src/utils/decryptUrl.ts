import CryptoJS from "crypto-js";

export function decryptUrl(encryptedUrl: string): string {
  // DES key (8 bytes)
  const key = CryptoJS.enc.Utf8.parse("38346591");

  // Convert Base64 → WordArray
  const ciphertextWA = CryptoJS.enc.Base64.parse(encryptedUrl);

  // Wrap into proper CipherParams object
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: ciphertextWA,
  });

  // DES-ECB decrypt with PKCS5/PKCS7 padding
  const decrypted = CryptoJS.DES.decrypt(cipherParams, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Convert bytes to UTF-8
  let url = decrypted.toString(CryptoJS.enc.Utf8);

  // Apply your Python replacement logic
  url = url.replace("_96.mp4", "_320.mp4");

  return url;
}
