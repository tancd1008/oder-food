import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOptionsFromData } from "../../../helper/optionsSelect";
import { getAllCategoriesInRestaurant } from "../../../services/category";
import { getDetailFood } from "../../../services/food";
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
    }
    getCategory();
    getFood()
   
  }, [restaurantId,foodId]);
 
 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!e.target.files) {
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, imgSrc: e.target.files[0] });
    }
  };
  const handleSelectChange = (selectedOptions) => {
    setState({
      ...state,
      categoryId: createOptionsFromData(selectedOptions, labelKeys, valueKeys),
    });
  };
  const initialSelectedCategories = createOptionsFromData(
    state.categoryId,
    labelKeys,
    valueKeys,
  );
  const handleSubmit = (e) => {
    e.preventDefault();
   
   try {
 
    toast.success("Cập nhật sản phẩm thành công");
    setTimeout(() => {
      navigate("/admin/list");
    }, 3000);
  } catch (error) {
    toast.error("Lỗi");
  }
  };
  console.log(state);
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
            value={initialSelectedCategories}
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
