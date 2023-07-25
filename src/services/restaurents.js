import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { database } from "../firebase-config";
import { getUserIdByEmail } from "./users";

const COLLECTION_NAME = "restaurants";

export const createRestaurant = async (restaurant, email) => {
  try {
    const batch = writeBatch(database);
    const userId = await getUserIdByEmail(email);
    restaurant.userId = userId;
    restaurant.createdAt = serverTimestamp();
    // const newRestaurantId = restaurant.id;

    // Kiểm tra xem userId đã tồn tại trong tài liệu "restaurants" hay chưa
    const restaurantRef = doc(collection(database, COLLECTION_NAME), userId);
    const restaurantDoc = await getDoc(restaurantRef);
    const isUserIdExist = restaurantDoc.exists();

    if (!isUserIdExist) {
      // Nếu userId chưa tồn tại, thêm tài liệu vào bộ sưu tập "restaurants" và chỉ định ID của tài liệu mới
      batch.set(restaurantRef, restaurant);

      const collections = ["category", "bill", "food", "option", "voucher", "shift"];
      collections.forEach((collectionName) => {
        // Thêm tài liệu vào các bộ sưu tập con và chỉ định ID của tài liệu con
        const subcollectionRef = doc(
          collection(database, `${COLLECTION_NAME}/${userId}/${collectionName}`)
        );
        batch.set(subcollectionRef, {});
      });

      // Thực thi batch để thêm dữ liệu vào "restaurants" và các bộ sưu tập con cùng một lúc
      await batch.commit();

      console.log(
        "New document added to 'restaurants' collection with ID:",
        restaurantRef.id
      );
    } else {
      console.log(`User with ID ${userId} already exists in the restaurant.`);
    }
  } catch (error) {
    console.error("Error adding document to 'restaurants' collection: ", error);
  }
};
export const getRestaurant = () =>{

}
