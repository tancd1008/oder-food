import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../firebase-config";
import { storage } from "../firebase-config";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid"
const COLLECTION_NAME = "restaurants";

export const addFood = async (food, restaurantId) => {
  try {
    const foodId = uuidv4()
    const foodRef = doc(database, `${COLLECTION_NAME}/${restaurantId}/food/${foodId}`);
    
    const imageStorageRef = storageRef(storage, `images/${food.imgSrc.name}`);
    const uploadTask = uploadBytesResumable(imageStorageRef, food.imgSrc);
    const snapshot = await uploadTask;
    // Lấy URL tải xuống từ ảnh đã tải lên
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Cập nhật trường imgSrc trong đối tượng sản phẩm với URL tải xuống
    food.imgSrc = downloadURL;
    await setDoc(foodRef, {...food, id: foodId, restaurantId: restaurantId});
    return foodRef.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getAllFoodInRestaurant = async (restaurantId) => {
  try {
    // Lấy danh sách danh mục từ Firestore

    const foodSnapshot = await getDocs(
      collection(database, `${COLLECTION_NAME}/${restaurantId}/food`)
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

   
 
  export const deleteFood = async (foodId,restaurantId) => {
    try {
      // Tạo reference tới document danh mục cần xóa
      const foodRef = doc(
        database,
        `${COLLECTION_NAME}/${restaurantId}/food/${foodId}`
      );
  
      // Xóa document danh mục
      await deleteDoc(foodRef);
  
      console.log("Delete food successfully!");
    } catch (error) {
      console.error("Delete food failed!", error);
      throw error; // Ném lỗi để xử lý bên ngoài nếu cần
    }
  }
  export const updateFood = async (foodId,restaurantId,foodUpdate) => {
    try {
      // Lấy reference của document danh mục dựa trên foodId
      const foodRef = doc(database, `${COLLECTION_NAME}/${restaurantId}/food/${foodId}`);
  
      // Cập nhật thông tin danh mục bằng foodUpdate
      await updateDoc(foodRef, foodUpdate);
  
      console.log("Edit food successfully!");
    } catch (error) {
      console.error("edit food failed:", error);
      throw error; // Ném lỗi để xử lý bên ngoài nếu cần
    }
  }
