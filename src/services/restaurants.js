import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "../firebase-config";
import { createUser } from "./users";

const COLLECTION_NAME = "restaurants";

// Hàm kiểm tra email đã tồn tại trong bộ sưu tập "restaurants" chưa
async function isEmailExist(email) {
  const restaurantsRef = collection(database, COLLECTION_NAME);
  const q = query(restaurantsRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

// Hàm tạo các bộ sưu tập con trong bộ sưu tập "restaurants"
async function createCollections(restaurantRefId, restaurantRef, batch) {
  const collections = [
    "food",
    "category",
    "bill",
    "option",
    "voucher",
    "shift",
  ];

  collections.forEach((collectionName) => {
    if (collectionName === "category") {
      const subCollectionRef = doc(
        collection(
          database,
          `${COLLECTION_NAME}/${restaurantRefId}/${collectionName}`
        )
      );
      batch.set(subCollectionRef, { name: "Other category" });
    }
  });
}

// Hàm tạo bộ sưu tập "restaurants" và các bộ sưu tập con
export const createRestaurant = async (restaurant) => {
  try {
    restaurant.createdAt = serverTimestamp();

    // Kiểm tra xem đã có tài liệu trong bộ sưu tập "restaurants" chứa email trùng với email của nhà hàng mới hay chưa
    const isExist = await isEmailExist(restaurant.email);

    if (!isExist) {
      // Nếu không tìm thấy email trùng, tạo bộ sưu tập "restaurants" và các bộ sưu tập con
      const batch = writeBatch(database);
      const restaurantRef = doc(collection(database, COLLECTION_NAME));
      batch.set(restaurantRef, restaurant);
      await createCollections(restaurantRef.id, restaurantRef, batch);

      // Thực thi batch để thêm dữ liệu vào "restaurants" và các bộ sưu tập con cùng một lúc
      await batch.commit();

      // Sau khi thêm nhà hàng, thêm bản ghi mới vào collection "users" với thông tin email và id của nhà hàng
      const role = "USER"; // Vai trò của người dùng khi tạo nhà hàng mới
      await createUser({
        restaurantId: restaurantRef.id,
        email: restaurant.email,
        role,
        // Các thông tin người dùng khác (nếu có)
      });
    } else {
      console.log(
        `A restaurant with email ${restaurant.email} already exists.`
      );
    }
  } catch (error) {
    console.error("Error adding document to 'restaurants' collection: ", error);
  }
};
export const getAllRestaurants = async () => {
  try {
    const restaurantsRef = collection(database, COLLECTION_NAME);
    const querySnapshot = await getDocs(restaurantsRef);

    const restaurants = [];
    querySnapshot.forEach((doc) => {
      restaurants.push({ id: doc.id, ...doc.data() });
    });

    return restaurants;
  } catch (error) {
    console.error(
      "Error getting documents from 'restaurants' collection: ",
      error
    );
    return [];
  }
};
export const updateRestaurant = async (updatedData) => {
  try {
    const restaurantRef = doc(collection(database, COLLECTION_NAME), updatedData.id);
    await updateDoc(restaurantRef, updatedData);
    toast.success("Cập nhật thành công");
  } catch (error) {
    toast.error("Lỗi khi cập nhật");
    console.error("Lỗi khi cập nhật nhà hàng:", error);
  }
};
