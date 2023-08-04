import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { database, storage } from "../firebase-config";
const COLLECTION_NAME = "restaurants";

export const addFood = async (food, restaurantId) => {
  try {
    const foodId = uuidv4();
    const foodRef = doc(
      database,
      `${COLLECTION_NAME}/${restaurantId}/food/${foodId}`,
    );

    const imageStorageRef = storageRef(storage, `images/${food.imgSrc.name}`);
    const uploadTask = uploadBytesResumable(imageStorageRef, food.imgSrc);
    const snapshot = await uploadTask;
    // Lấy URL tải xuống từ ảnh đã tải lên
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Cập nhật trường imgSrc trong đối tượng sản phẩm với URL tải xuống
    food.imgSrc = downloadURL;
    await setDoc(foodRef, { ...food, id: foodId, restaurantId: restaurantId });

    const addedDoc = await getDoc(foodRef);
    if (addedDoc.exists()) {
      const addedFood = addedDoc.data();
      return addedFood; // Trả về thông tin của bản ghi đã thêm vào
    } else {
      console.log("Không tìm thấy bản ghi đã thêm");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getAllFoodInRestaurant = async (restaurantId) => {
  try {
    // Lấy danh sách danh mục từ Firestore

    const foodSnapshot = await getDocs(
      collection(database, `${COLLECTION_NAME}/${restaurantId}/food`),
    );

    // Biến categorySnapshot chứa một danh sách các tài liệu (documents) trong collection
    const foods = foodSnapshot.docs.map((doc) => {
      // Trả về dữ liệu của từng tài liệu (document) trong danh sách
      return { id: doc.id, ...doc.data() };
    });

    return foods;
  } catch (error) {
    console.error("Failed to food", error);
    return []; // Trả về một mảng rỗng nếu có lỗi xảy ra
  }
};

export const deleteFood = async (foodId, restaurantId) => {
  try {
    // Tạo reference tới document danh mục cần xóa
    const foodRef = doc(
      database,
      `${COLLECTION_NAME}/${restaurantId}/food/${foodId}`,
    );

    // Xóa document danh mục
    await deleteDoc(foodRef);

    console.log("Delete food successfully!");
  } catch (error) {
    console.error("Delete food failed!", error);
    throw error; // Ném lỗi để xử lý bên ngoài nếu cần
  }
};
export const updateFood = async (foodId, foodUpdate, restaurantId) => {
  try {
    // Lấy reference của document danh mục dựa trên foodId
    const foodRef = doc(
      database,
      `${COLLECTION_NAME}/${restaurantId}/food/${foodId}`,
    );

    if (foodUpdate.imgSrc && typeof foodUpdate.imgSrc !== "string") {
      const imageStorageRef = storageRef(
        storage,
        `images/${foodUpdate.imgSrc.name}`,
      );
      const uploadTask = uploadBytesResumable(
        imageStorageRef,
        foodUpdate.imgSrc,
      );
      const snapshot = await uploadTask;
      // Lấy URL tải xuống từ ảnh đã tải lên
      const downloadURL = await getDownloadURL(snapshot.ref);
      foodUpdate.imgSrc = downloadURL;
    } else {
      // Nếu không có ảnh mới, giữ nguyên URL ảnh cũ
      delete foodUpdate.imgSrc; // Xóa trường imgSrc để giữ nguyên URL ảnh cũ
    }
    // Cập nhật thông tin danh mục bằng foodUpdate
    await updateDoc(foodRef, foodUpdate);
    const updatedDoc = await getDoc(foodRef);
    if (updatedDoc.exists()) {
      const updatedFood = updatedDoc.data();
      return updatedFood; // Trả về thông tin của món ăn đã cập nhật
    } else {
      console.log("Không tìm thấy bản ghi đã cập nhật");
      return null;
    }
  } catch (error) {
    console.error("edit food failed:", error);
    throw error; // Ném lỗi để xử lý bên ngoài nếu cần
  }
};
export const getDetailFood = async (foodId, restaurantId) => {
  try {
    const foodRef = doc(
      database,
      `${COLLECTION_NAME}/${restaurantId}/food/${foodId}`,
    );

    // Lấy dữ liệu của document danh mục
    const foodDoc = await getDoc(foodRef);
    return foodDoc.data();
  } catch (error) {
    return null;
  }
};
