import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, push } from "firebase/database";
import { getImageUrl, uploadImage } from "../../services/uploadImage";
import { storage } from "../../firebase-config";
const innititalState = {
  name: "",
  price: "",
  desc: "",
  imgSrc:""
};
const AddProduct = () => {
  const [state, setState] = useState(innititalState);
  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState("");

  const { name, price, desc, imgSrc } = state;

  const imgTail = ["png", "jpg", "jpeg", "svg", "gif"];


  const checkImage = (imageName) => {
    var check = false;
    for (let i = 0; i < imgTail.length; i++) {
      if (imageName.includes(imgTail[i])) {
        check = true;
        break;
      }
    }
    return check;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(!e.target.files){
      setState({ ...state, [name]: value });
    }else{
      console.log(e.target.files)
      const img = e.target.files[0].name;
      setImage(e.target.files[0]);
      setState({...state, imgSrc: img})

    }
    // console.log("2222")
  };
  const uploadFileImage = () =>{

    var check = checkImage(state.imgSrc);
      if (!check) {
        toast.error(`File upload phải có đuôi là : ${imgTail.join(", ")} `);
      } else {
        try {
          uploadImage(image, setUrlImage);
         
        } catch (error) {
          toast.error(error);
        }
      }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (!name || !price  || !desc || !imgSrc) {
      toast.error("Mời bạn nhập!");
    } else {
      
      uploadFileImage();
      
      const db = getDatabase();
      // push(ref(db, 'products/'), state)
      // .then(() => {
      //   toast.success("Thêm sản phẩm thành công")
      // })
      // .catch((error) => {
      //   toast.error("Lỗi")
      // });
    }
  };



  return (
    <div >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
          >
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
          >
            Giá tiền
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="form-control"  value={price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
          >
            Nội dung
          </label>
          <input
            type="text"
            id="pdescrice"
            name="desc"
            className="form-control" value={desc}
            onChange={handleInputChange}
          />
        </div>
        <div className=" mb-3">
          <label
            htmlFor="dropzone-file"
            className="form-label"
          >
          
            <input id="dropzone-file" name="imgSrc" type="file" className="form-control" onChange={handleInputChange}  />
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Thêm mới
        </button>
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={urlImage}
              alt="Two each of gray, white, and black shirts laying flat."
              className="rounded-[1rem] object-cover object-center"
            />
          </div>
        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default AddProduct;
