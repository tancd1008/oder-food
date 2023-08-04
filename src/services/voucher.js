import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { database } from "../firebase-config";

const COLLECTION_NAME = "restaurants";

export const addVoucher = async (voucher, restaurantId) => {
  try {
    const voucherId = uuidv4();
    const voucherRef = doc(
      database,
      `${COLLECTION_NAME}/${restaurantId}/voucher/${voucherId}`,
    );

    // Thêm dữ liệu của voucher vào tài liệu
    await setDoc(voucherRef, {
      ...voucher,
      id: voucherId,
      restaurantId: restaurantId,
    });
    // Lấy thông tin của bản ghi đã thêm
    const addedDoc = await getDoc(voucherRef);
    if (addedDoc.exists()) {
      const addedVoucher = addedDoc.data();
      return addedVoucher;
    } else {
      console.log("Không tìm thấy bản ghi đã thêm");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const updateVoucher = async (voucherId, voucher, restaurantId) => {
  try {
    // Lấy reference của document voucher dựa trên voucherId
    const voucherRef = doc(
      database,
      `${COLLECTION_NAME}/${restaurantId}/voucher/${voucherId}`,
    );

    // Cập nhật thông tin voucher bằng updatedoptions
    await updateDoc(voucherRef, voucher);

    console.log("Đã cập nhật voucher thành công!");
  } catch (error) {
    console.error("Đã xảy ra lỗi khi cập nhật voucher:", error);
    throw error; // Ném lỗi để xử lý bên ngoài nếu cần
  }
};
export const deleteVoucher = async (voucherId, restaurantId) => {
  try {
    // Tạo reference tới document voucher cần xóa
    const voucherRef = doc(
      database,
      `${COLLECTION_NAME}/${restaurantId}/voucher/${voucherId}`,
    );

    // Xóa document voucher
    await deleteDoc(voucherRef);
  } catch (error) {
    console.error("Đã xảy ra lỗi khi xóa voucher:", error);
    throw error; // Ném lỗi để xử lý bên ngoài nếu cần
  }
};
export const getAllVoucherRestaurant = async (restaurantId) => {
  try {
    // Lấy danh sách voucher từ Firestore

    const voucherSnapshot = await getDocs(
      collection(database, `${COLLECTION_NAME}/${restaurantId}/voucher`),
    );

    // Biến voucherSnapshot chứa một danh sách các tài liệu (documents) trong collection
    const voucher = voucherSnapshot.docs.map((doc) => {
      // Trả về dữ liệu của từng tài liệu (document) trong danh sách
      return { id: doc.id, ...doc.data() };
    });

    return voucher;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy voucher:", error);
    return []; // Trả về một mảng rỗng nếu có lỗi xảy ra
  }
};
export const getDetailVoucher = async (voucherId, restaurantId) => {
  try {
    const voucherRef = doc(
      database,
      `${COLLECTION_NAME}/${restaurantId}/voucher/${voucherId}`,
    );

    // Lấy dữ liệu của document voucher
    const voucherDoc = await getDoc(voucherRef);
    console.log("Thành công");
    console.log(voucherDoc.data());
    return voucherDoc.data();
  } catch (error) {
    console.log("Lỗi");
    return null;
  }
};
