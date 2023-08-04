import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase-config";

export const uploadImage = (file, setUrl) => {
  const storageRf = ref(storage, `images/${file.name}`);
  const upload = uploadBytesResumable(storageRf, file);
  upload
    .then((snapshot) => {
      getDownloadURL(upload.snapshot.ref).then((url) => {
        setUrl(url);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
};
export const getImageUrl = (file) => {
  const src = "";
  const storageRf = ref(storage, `images/${file.name}`);
  const getUrl = getDownloadURL(storageRf, file);
  getUrl
    .then((url) => {
      this.src = url;
    })
    .catch((error) => {
      console.log("error", error);
    });
  return src;
};
export const deleteImage = (imageUrl) => {
  const storageRf = ref(storage, `images/${imageUrl}`);
  deleteObject(storageRf)
    .then(() => {
      // File deleted successfully
      console.log("delete success");
    })
    .catch((error) => {
      console.log("failed", error);
      // Uh-oh, an error occurred!
    });
};
