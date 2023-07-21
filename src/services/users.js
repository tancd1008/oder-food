import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { database } from "../firebase-config";

const COLLECTION_NAME = "users";
export const createUser = async (userInfo) => {
  try {
    const q = query(
      collection(database, "users"),
      where("email", "==", userInfo.email)
    );
    const querySnapshot = await getDocs(q);

    userInfo.createAt = serverTimestamp();
    if (querySnapshot.size === 0) {
      // Nếu không có email trùng lặp, thêm tài liệu mới vào "users"
      const userRef = await addDoc(
        collection(database, COLLECTION_NAME),
        userInfo
      );
      console.log(
        "New document added to 'users' collection with ID:",
        userRef.id
      );
    } else {
      console.log("Email is already in use.");
    }
  } catch (error) {
    console.error("Error adding document to 'users' collection: ", error);
  }
};
export const getUserIdByEmail = async (email) => {
  try {
    const q = query(
      collection(database, COLLECTION_NAME),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Trả về dữ liệu của tài liệu đầu tiên trong kết quả truy vấn
      const userDocSnapshot = querySnapshot.docs[0];
      const userData = userDocSnapshot.data();
      userData.id = userDocSnapshot.id;
      return userData.id;
    } else {
      return null; // Trả về null nếu không tìm thấy tài liệu nào
    }
  } catch (error) {
    console.error("Error getting user data: ", error);
  }
};
