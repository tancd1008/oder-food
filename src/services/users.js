import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";
import { auth, database } from "../firebase-config";

const COLLECTION_NAME = "users";
export const createUser = async (userInfo) => {
  try {
    const q = query(
      collection(database, "users"),
      where("email", "==", userInfo.email)
    );
    const querySnapshot = await getDocs(q);

    userInfo.createAt = serverTimestamp();
    userInfo.isActive = true
    userInfo.imageUrl = ""
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
      await createUserWithEmailAndPassword(auth, userInfo.email, "Aa@1345");
    } else {
      console.log("Email is already in use.");
    }
  } catch (error) {
    console.error("Error adding document to 'users' collection: ", error);
  }
};
export const updateUserByEmail = async (email, updatedUserInfo) => {
  try {
    // Tạo truy vấn để tìm người dùng dựa trên địa chỉ email
    const q = query(collection(database, COLLECTION_NAME), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Lấy ID của tài liệu người dùng tìm thấy
      const userId = querySnapshot.docs[0].id;
      
      // Thêm thông tin 'updateAt' với thời điểm hiện tại
      updatedUserInfo.updateAt = serverTimestamp();

      // Cập nhật thông tin người dùng
      const userRef = doc(database, COLLECTION_NAME, userId);
      await updateDoc(userRef, updatedUserInfo);

      console.log(`User with email ${email} updated successfully.`);
    } else {
      console.log(`User with email ${email} does not exist.`);
    }
  } catch (error) {
    console.error("Error updating user document: ", error);
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
export const getAllUser= async () => {
  try {
    const usersRef = collection(database, COLLECTION_NAME);
    const querySnapshot = await getDocs(usersRef);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error(
      "Error getting documents from 'users' collection: ",
      error
    );
    return [];
  }
};
