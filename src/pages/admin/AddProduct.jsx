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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (!name || !price  || !desc || !imgSrc) {
      toast.error("Mời bạn nhập!");
    } else {
      var check = checkImage(state.imgSrc);
      if (!check) {
        toast.error(`File upload phải có đuôi là : ${imgTail.join(", ")} `);
      } else {
        try {
          uploadImage(image, setUrlImage);
          getImageUrl(image,setUrlImage)

          toast.success("Thành công")
          // setTimeout(() => {
          //   getImageUrl(image,setUrlImage);
          // }, 2000);
        } catch (error) {
          toast.error(error);
        }
      }
      console.log(state)
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Sản phẩm"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Giá tiền
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nội dung
          </label>
          <input
            type="text"
            id="pdescrice"
            name="desc"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={desc}
            onChange={handleInputChange}
          />
        </div>
        <div className=" mb-6">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" name="imgSrc" type="file" className="hidden" onChange={handleInputChange}  />
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
