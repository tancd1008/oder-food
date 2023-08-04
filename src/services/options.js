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
  
  export const addOpitons = async (options, restaurantId) => {
    try {
      const optionsId = uuidv4();
      const optionsRef = doc(
        database,
        `${COLLECTION_NAME}/${restaurantId}/options/${optionsId}`
      );
  
      // Thêm dữ liệu của danh mục vào tài liệu
      await setDoc(optionsRef, {
        ...options,
        id: optionsId,
        restaurantId: restaurantId,
      });
      // Lấy thông tin của bản ghi đã thêm
      const addedDoc = await getDoc(optionsRef);
      if (addedDoc.exists()) {
        const addedOptions = addedDoc.data();
        return addedOptions;
      } else {
        console.log("Không tìm thấy bản ghi đã thêm");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  export const getAllOptionsRestaurant = async (restaurantId) => {
    try {
      // Lấy danh sách danh mục từ Firestore
  
      const optionsSnapshot = await getDocs(
        collection(database, `${COLLECTION_NAME}/${restaurantId}/options`)
      );
  
      // Biến optionsSnapshot chứa một danh sách các tài liệu (documents) trong collection
      const options = optionsSnapshot.docs.map((doc) => {
        // Trả về dữ liệu của từng tài liệu (document) trong danh sách
        return { id: doc.id, ...doc.data() };
      });
  
      return options;
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lấy danh mục:", error);
      return []; // Trả về một mảng rỗng nếu có lỗi xảy ra
    }
  };
  export const updateOptions = async (optionsId, options,restaurantId ) => {
    try {
      // Lấy reference của document danh mục dựa trên optionsId
      const optionsRef = doc(
        database,
        `${COLLECTION_NAME}/${restaurantId}/options/${optionsId}`
      );
  
      // Cập nhật thông tin danh mục bằng updatedoptions
      await updateDoc(optionsRef, options);
  
      console.log("Đã cập nhật danh mục thành công!");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật danh mục:", error);
      throw error; // Ném lỗi để xử lý bên ngoài nếu cần
    }
  };
  export const getDetailOptions = async (optionsId, restaurantId) => {
    try {
      const optionsRef = doc(
        database,
        `${COLLECTION_NAME}/${restaurantId}/options/${optionsId}`
      );
  
      // Lấy dữ liệu của document options
      const optionsDoc = await getDoc(optionsRef);
      console.log("Thành công");
      return optionsDoc.data();
    } catch (error) {
      console.log("Lỗi");
      return null;
    }
  };
  export const deleteOptions = async (optionsId, restaurantId) => {
    try {
      // Tạo reference tới document danh mục cần xóa
      const optionsRef = doc(
        database,
        `${COLLECTION_NAME}/${restaurantId}/options/${optionsId}`
      );
  
      // Xóa document danh mục
      await deleteDoc(optionsRef);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xóa danh mục:", error);
      throw error; // Ném lỗi để xử lý bên ngoài nếu cần
    }
  };
  