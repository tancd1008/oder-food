import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../firebase-config";

const COLLECTION_NAME = "restaurants";

export const addCategory = async (category, restaurantId) => {
  try {
    const categoryRef = await addDoc(
        collection(database, `${COLLECTION_NAME}/${restaurantId}/category`),
        {...category, restaurantId: restaurantId}
      );
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
  export const getDetailCategory = async (categoryId, restaurantId) => {
    try {
      const categoryRef = doc(
        database,
        `${COLLECTION_NAME}/${restaurantId}/category/${categoryId}`
      );

      // Lấy dữ liệu của document danh mục
      const categoryDoc = await getDoc(categoryRef);
      console.log("Thành công")
      return categoryDoc
    } catch (error) {
      console.log("Lỗi")
      return null
    }
  }
  export const deleteCategory = async (categoryId,restaurantId) => {
    try {
      // Tạo reference tới document danh mục cần xóa
      const categoryRef = doc(
        database,
        `${COLLECTION_NAME}/${restaurantId}/category/${categoryId}`
      );
  
      // Xóa document danh mục
      await deleteDoc(categoryRef);
  
      console.log("Đã xóa danh mục thành công!");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xóa danh mục:", error);
      throw error; // Ném lỗi để xử lý bên ngoài nếu cần
    }
  }
  