import { addDoc, collection, doc } from "firebase/firestore";
import { database } from "../firebase-config";

const COLLECTION_NAME = "restaurants";

export const addCategory = async (category, restaurantId) => {
  try {
    category.status = 0;
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
