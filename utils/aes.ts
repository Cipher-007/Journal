import CryptoJS from "crypto-js";

export function encrypt(text: string): string {
  const encrypted = CryptoJS.AES.encrypt(text, process.env.AES_KEY!).toString();
  return encrypted;
}

export function decrypt(encrypted: string): string {
  const decrypted = CryptoJS.AES.decrypt(encrypted, process.env.AES_KEY!);
  const originalText = decrypted.toString(CryptoJS.enc.Utf8);
  return originalText;
}
