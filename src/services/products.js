import { getDatabase, ref, remove } from "firebase/database"

const database = getDatabase()
const collectionName = "products"
const productRef = ref(database, "products")

export const deleteProduct = (productId)=>{
  const productIdRef = ref(database, `${collectionName}/${productId}`)
  remove(productIdRef).then(()=>{
    console.log("success")
  }).catch((error)=>{
    console.log("err",error)
  })
}