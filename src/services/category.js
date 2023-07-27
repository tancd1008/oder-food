import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../firebase-config";

const COLLECTION_NAME = "restaurants";

export const addCategory = async (category, restaurantId) => {
  try {
    console.log(category)
    const categoryRef = await addDoc(
        collection(database, `${COLLECTION_NAME}/${restaurantId}/category`),
        {...category, restaurantId: restaurantId}
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
  export const updateCategory = async (categoryId,restaurantId,updatedCategory) => {
    try {
      // Lấy reference của document danh mục dựa trên categoryId
      const categoryRef = doc(database, `${COLLECTION_NAME}/${restaurantId}/category/${categoryId}`);
  
      // Cập nhật thông tin danh mục bằng updatedCategory
      await updateDoc(categoryRef, updatedCategory);
  
      console.log("Đã cập nhật danh mục thành công!");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật danh mục:", error);
      throw error; // Ném lỗi để xử lý bên ngoài nếu cần
    }
  }
  