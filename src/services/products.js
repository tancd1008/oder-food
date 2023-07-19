import 'firebase/database';
import { getDatabase, ref, remove, set, update } from "firebase/database"

const database = getDatabase()
const collectionName = "products"

export const deleteProduct = (productId)=>{
  const productIdRef = ref(database, `${collectionName}/${productId}`)
  remove(productIdRef).then(()=>{
    console.log("success")
  }).catch((error)=>{
    console.log("err",error)
  })
}
export const updateProduct =(productId, product)=>{
  const productIdRef = ref(database, `${collectionName}/${productId}`)
  set(productIdRef, product, { merge: true })
    .then(() => {
      console.log("Cập nhật thành công");
    })
    .catch((error) => {
      console.error("Lỗi khi cập nhật: ", error);
    });
}