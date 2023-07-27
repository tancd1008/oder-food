import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { database } from "../firebase-config";

const COLLECTION_NAME = "restaurants";

export const addCategory = async (category, restaurantId) => {
  try {
    const categoryRef = await addDoc(
        collection(database, `${COLLECTION_NAME}/${restaurantId}/category`),
        category
      );
      console.log('Đã thêm danh mục thành công:', categoryRef.id);
      return categoryRef.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getAllCategoriesInRestaurant = async (restaurantId) => {
    try {
      // Lấy danh sách danh mục từ Firestore
      const categorySnapshot = await getDocs(
        collection(database, `${COLLECTION_NAME}/${restaurantId}/category`)
      );
  
      // Biến categorySnapshot chứa một danh sách các tài liệu (documents) trong collection
      const categories = categorySnapshot.docs.map((doc) => {
        // Trả về dữ liệu của từng tài liệu (document) trong danh sách
        return { id: doc.id, ...doc.data() };
      });
  
      return categories;
    } catch (error) {
      console.error('Đã xảy ra lỗi khi lấy danh mục:', error);
      return []; // Trả về một mảng rỗng nếu có lỗi xảy ra
    }
  };
  