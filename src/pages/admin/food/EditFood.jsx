import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  convertOptions, createOptionsFromData } from "../../../helper/optionsSelect";
import { getAllCategoriesInRestaurant } from "../../../services/category";
import { getDetailFood, updateFood } from "../../../services/food";
import Select from "react-select";

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
  const [selectOld, setSlectOld] = useState();
  const { restaurantId, foodId } = useParams();
  const valueKeys = ["id", "name"];
  const labelKeys = ["value", "label"];
  const navigate = useNavigate();
  useEffect(() => {
    const getCategory = async () => {
      const listCategories = await getAllCategoriesInRestaurant(
        restaurantId
      );
      setCategories(
        createOptionsFromData(listCategories, valueKeys, labelKeys)
      );
    };
    const getFood = async () => {
      const foodDoc = await getDetailFood(foodId,restaurantId)
      setState(foodDoc.data())
      // Convert dữ liệu trong categoryId sang định dạng của Select
      const convertedOptions = createOptionsFromData(foodDoc.data().categoryId, valueKeys,labelKeys  );
      setSlectOld(convertedOptions);
    
    }
    getCategory();
    getFood()
   
  }, [restaurantId,foodId]);
 
 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "imgSrc") {
      // Kiểm tra xem có chọn ảnh mới hay không
      if (e.target.files && e.target.files.length > 0) {
        // Nếu có chọn ảnh mới, lấy ảnh đầu tiên trong danh sách files
        setState({ ...state, imgSrc: e.target.files[0] });
      }
    } else {
      // Nếu không phải trường imgSrc, giữ nguyên giá trị
      setState({ ...state, [name]: value });
    }
  };
  const handleSelectChange = (selectedOptions) => {
    setState({
      ...state,
      categoryId: createOptionsFromData(selectedOptions, labelKeys, valueKeys),
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
   try {
    await updateFood(foodId,restaurantId,state)
    toast.success("Cập nhật sản phẩm thành công");
    setTimeout(() => {
      navigate("/admin/food/list");
    }, 3000);
  } catch (error) {
    toast.error("Lỗi");
  }
  };
  return (
    <div>
       <form onSubmit={handleSubmit}>
        <h1 className="text-center">Cập nhật món ăn</h1>
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
          <Select
            isMulti
            name="categories"
            options={categories}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
            value={selectOld}
          />
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
