import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteImage, uploadImage } from "../../services/uploadImage";
import { getDatabase, onValue, push, ref, set } from "@firebase/database";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const innititalState = {
  id:"",
  name: "",
  price: "",
  desc: "",
  imgSrc: "",
  categoryId:"",
  status: 0
};
const AddProduct = () => {
  const [state, setState] = useState(innititalState);
  const [categories, setCategories] = useState([])
  const [urlImage, setUrlImage] = useState("");

  const { id, name, price, desc, imgSrc, categoryId } = state;

  const imgTail = ["png", "jpg", "jpeg", "svg", "gif"];
  const navigate = useNavigate();
  useEffect(() => {
    const getCategory = async () => {
      const db = getDatabase();
      const productRef = ref(db, "categories/");
      onValue(productRef, (snapshot) => {
        var newData = [];
        snapshot.forEach((item) => {
          newData.push(item.val());
        });
        setCategories(newData);
      });
    };
    getCategory();
  }, []);
  console.log(categories)
  const checkImage = (imageName) => {
    console.log(typeof imageName);
    var check = false;
    for (let i = 0; i < imgTail.length; i++) {
      if (imageName.includes(imgTail[i])) {
        check = true;
        break;
      }
    }
    return check;
  };
  const uploadFileImage = (imageFile) => {
    var check = checkImage(imageFile.name);
    if (!check) {
      toast.error(`File upload phải có đuôi là : ${imgTail.join(", ")} `);
    } else {
      try {
        uploadImage(imageFile, setUrlImage);
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!e.target.files) {
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, imgSrc: e.target.files[0].name });
      if (urlImage) {
        deleteImage(state.imgSrc);
      }
      uploadFileImage(e.target.files[0]);
    }
    console.log(state)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    state.imgSrc = urlImage;
    if (!name || !price || !desc || !imgSrc ) {
      toast.error("Mời bạn nhập!");
    } else {
      const db = getDatabase();
      const productRef = ref(db, "products/");
      const newProductRef = push(productRef);
      const newProductId = newProductRef.key;
      const newProductData = {...state, id: newProductId};
      set(newProductRef, newProductData).then(() => {
        toast.success("Thêm sản phẩm thành công")
        setTimeout(() => {
          navigate("/admin/list")
        }, 3000)
      }).catch((error) => {
        toast.error("Lỗi");
      })
   
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Thêm mới món ăn</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Sản phẩm...."
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Danh mục
          </label>
          <select id="selectOption" className="form-control" name="categoryId" onChange={handleInputChange}>
            {categories.map((category,index) => (
              <option value={category.id} key={index}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Giá tiền
          </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="00000$"
            className="form-control"
            value={price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Nội dung
          </label>
          <input
            type="text"
            id="pdescrice"
            name="desc"
            placeholder="Nội dung...."
            className="form-control"
            value={desc}
            onChange={handleInputChange}
          />
        </div>
        <div className=" mb-3">
          <label htmlFor="dropzone-file" className="form-label">
            <input
              id="dropzone-file"
              name="imgSrc"
              type="file"
              className="form-control"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
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
