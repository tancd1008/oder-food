import CryptoJS from "crypto-js";

// Khóa bí mật (mã giải mã)
const secretKey = "ThisIsASecretKey123"; // Trong thực tế, hãy giữ khóa này bí mật và không được tiết lộ công khai

// Hàm mã hóa dữ liệu
export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
};

// Hàm giải mã dữ liệu
export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

// Hàm lưu thông tin người dùng vào Session Storage sau khi mã hóa
export const saveUserDataToSessionStorage = (userData) => {
  const encryptedData = encryptData(userData);
  sessionStorage.setItem('user', encryptedData);
};

// Hàm lấy thông tin người dùng từ Session Storage và giải mã
export const getUserDataFromSessionStorage = () => {
  const encryptedData = sessionStorage.getItem('user');
  if (encryptedData) {
    const userData = decryptData(encryptedData);
    return userData;
  }
  return null;
};

// Hàm xóa thông tin người dùng khỏi Session Storage
export const clearUserDataFromSessionStorage = () => {
  sessionStorage.removeItem('user');
};