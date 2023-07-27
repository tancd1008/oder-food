import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "@firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  getProductDetail, updateProduct } from "../../../services/products";

const EditFood = () => {
  const [state, setState] = useState({
    id: "",
    name: "",
    price: "",
    desc: "",
    imgSrc: "",
    categoryId: "",
    status: 0,
  });
  const [categories, setCategories] = useState([]);

  // const navigate = useNavigate();
  const {id} = useParams();
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
    }; const getProduct = async () => {
      const productData = await getProductDetail(id);
      if(productData) {
        setState(productData); // Cập nhật dữ liệu vào state sau khi lấy được sản phẩm
      }
     
    };
    getProduct();
   
    
    getCategory();
   
  }, [id]);
 
 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!e.target.files) {
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, imgSrc: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
   try {
    updateProduct(id,state)
    toast.success("Cập nhật sản phẩm thành công");
    setTimeout(() => {
      navigate("/admin/list");
    }, 3000);
  } catch (error) {
    toast.error("Lỗi");
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
            value={state.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Danh mục
          </label>
          <select
            id="selectOption"
            className="form-control"
            name="categoryId"
            onChange={handleInputChange}
          >
            {categories.map((category, index) => (
              <option value={category.id} key={index}>
                {category.name}
              </option>
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
            value={state.price}
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
            value={state.desc}
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
          Cập nhật
        </button>
       
        <ToastContainer position="top-center" />
      </form>
    </div>
  )
}

export default EditFood
