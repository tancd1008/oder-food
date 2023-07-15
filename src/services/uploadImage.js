import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../firebase-config"

export const uploadImage = (file,setUrl)=>{
  const storageRf = ref(storage, `images/${file.name}`)
  console.log(storageRf)
  const upload = uploadBytesResumable(storageRf, file)
  upload.then((snapshot)=>{
    getDownloadURL(upload.snapshot.ref).then((url) => {
      setUrl(url)
  });
  }).catch((error)=>{
    console.log("error",error)
  })
}
export const getImageUrl = (file, setUrl)=>{
  const storageRf = ref(storage, `images/${file.name}`)
  const getUrl = getDownloadURL(storageRf, file)
  getUrl.then((url)=>{
    setUrl(url)
  }).catch((error)=>{
    console.log("error",error)
  })
}