import "firebase/database";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-config";

const database = getDatabase();
const collectionName = "products";
const productRef = ref(database, "products");

export const deleteProduct = (productId) => {
  const productIdRef = ref(database, `${collectionName}/${productId}`);
  remove(productIdRef)
    .then(() => {
      console.log("success");
    })
    .catch((error) => {
      console.log("err", error);
    });
};
export const updateProduct = (productId, product) => {
  const productIdRef = ref(database, `${collectionName}/${productId}`);
  set(productIdRef, product, { merge: true })
    .then(() => {
      console.log("Cập nhật thành công");
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật: ", error);
    });
};
export const addProduct = async (product) => {
  try {
    // Tạo một khóa duy nhất cho sản phẩm và lấy khóa đó làm id
    const newProductRef = push(productRef);
    const newProductId = newProductRef.key;
    product.id = newProductId;

    // Tải lên ảnh đại diện vào Firebase Storage
    const imageStorageRef = storageRef(storage, `images/${product.imgSrc.name}`);
    const uploadTask = uploadBytesResumable(imageStorageRef, product.imgSrc);
    const snapshot = await uploadTask;

    // Lấy URL tải xuống từ ảnh đã tải lên
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Cập nhật trường imgSrc trong đối tượng sản phẩm với URL tải xuống
    product.imgSrc = downloadURL;

    // Lưu đối tượng sản phẩm mới vào Firebase Realtime Database
    await set(newProductRef, product);
    console.log("Thêm sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
  }
};
// export const getProductDetail = async(productId,setProduct) => {
//   const productIdRef = ref(database, `${collectionName}/${productId}`);
//   onValue(productIdRef,(snapshot) => {
//     setProduct(snapshot.val())
//   })
// }
export const getProductDetail = async (productId) => {
  try {
    const productIdRef = ref(database, `${collectionName}/${productId}`);

    // Lắng nghe sự kiện value để nhận dữ liệu sản phẩm khi nó thay đổi
    const snapshot = await new Promise((resolve) => {
      onValue(productIdRef, resolve);
    });

    // snapshot.val() chứa dữ liệu của sản phẩm
    const productData = snapshot.val();
    return productData;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    return null;
  }
};