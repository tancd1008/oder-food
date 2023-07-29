import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, database } from "../firebase-config";
import { saveUserDataToSessionStorage } from "./encode";

const COLLECTION_NAME = "users";
export const createUser = async (userInfo) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      "Aa@12345"
    );
    const user = userCredential.user;
    const uid = user.uid;
    const q = query(
      collection(database, "users"),
      where("email", "==", userInfo.email)
    );
    const querySnapshot = await getDocs(q);

    userInfo.createAt = serverTimestamp();
    userInfo.isActive = true;
    userInfo.imageUrl = "";
    if (querySnapshot.size === 0) {
      // Nếu không có email trùng lặp, thêm tài liệu mới vào "users"
      const userRef = doc(collection(database, COLLECTION_NAME), uid);
      await setDoc(userRef, userInfo);

    } else {
      console.log("Email is already in use.");
      const { restaurantId } = userInfo;

      if (restaurantId) {
        // Thực hiện cập nhật trường restaurantId cho tài liệu người dùng
        const userDoc = querySnapshot.docs[0]; // Giả sử chỉ có một tài liệu trùng lặp (email là duy nhất)
        const userRef = doc(collection(database, COLLECTION_NAME), userDoc.id);
        await updateDoc(userRef, { restaurantId });
        console.log("RestaurantId updated for existing user.");
      }
    }
  } catch (error) {
    console.error("Error adding document to 'users' collection: ", error);
  }
};
export const updateUserByEmail = async (email, updatedUserInfo) => {
  try {
    // Tạo truy vấn để tìm người dùng dựa trên địa chỉ email
    const q = query(
      collection(database, COLLECTION_NAME),
      where("email", "==", email)
    );
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
export const getAllUser = async () => {
  try {
    const usersRef = collection(database, COLLECTION_NAME);
    const querySnapshot = await getDocs(usersRef);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error("Error getting documents from 'users' collection: ", error);
    return [];
  }
};
export const loginAndFetchUserData = async (account) => {
  try {
    // Đăng nhập bằng email và mật khẩu
    const userCredential = await signInWithEmailAndPassword(
      auth,
      account.email,
      account.password
    );
    const user = userCredential.user;
    const userId = user.uid;
    // Lấy token đăng nhập từ user object
    const token = await user.getIdToken();
    // Truy vấn vào bộ sưu tập "users" để lấy thông tin người dùng qua email
    const userRef = doc(collection(database, COLLECTION_NAME), userId);
    const docSnapshot = await getDoc(userRef);

    if (docSnapshot.exists()) {
      // Tài liệu tồn tại, lấy thông tin người dùng từ Firestore
      const userData = docSnapshot.data();
      toast.success("Bạn đăng nhập thành công!");
      const user = { ...userData, token, userId };
      saveUserDataToSessionStorage(user)
      setTimeout(() => {
        window.location.href = "/admin";
      }, 3000);
    } else {
      toast.error("Sai thông tin đăng nhập!");
    }
  } catch (error) {
    console.error("Error signing in or getting user document: ", error);
    toast.error("Sai thông tin đăng nhập!");
  }
};
