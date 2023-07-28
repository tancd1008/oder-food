import { getDatabase, onValue, ref } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { getAllCategoriesInRestaurant } from "../../../services/category";
import {
  convertOptions,
  createOptionsFromData,
} from "../../../helper/optionsSelect";
import { addFood } from "../../../services/food";
import { useNavigate } from "react-router-dom";
const innititalState = {
  id: "",
  name: "",
  price: "",
  desc: "",
  imgSrc: "",
  categoryId: [],
  is_active: 0,
};
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const AddFood = () => {
  const [state, setState] = useState(innititalState);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { name, price, desc, imgSrc } = state;
  const user = JSON.parse(sessionStorage.getItem("user"));
  const valueKeys = ["id", "name"];
  const labelKeys = ["value", "label"];

  useEffect(() => {
    const getCategory = async () => {
      const listCategories = await getAllCategoriesInRestaurant(
        user.restaurantId
      );
      setCategories(
        createOptionsFromData(listCategories, valueKeys, labelKeys)
      );
    };
    getCategory();
  }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFoodData = { ...state };
    console.log(newFoodData)
    await addFood(newFoodData, user.restaurantId)
      .then((foodId) => {
        console.log("Food added successfully with ID: ", foodId);
        toast.success("Food added successfully!");
        setTimeout(() => {
          navigate("/admin/food/list");
        }, 2500);
      })
      .catch((error) => {
        console.error("Failed to add food: ", error);
        toast.error("Failed to add food!");
      });
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
          <label htmlFor="categoryId" className="form-label">
            Danh mục
          </label>
          {/* <select
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
          </select> */}
          <Select
            isMulti
            name="colors"
            options={categories}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
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
          {/* <img
            src={urlImage}
            alt="Two each of gray, white, and black shirts laying flat."
            className="rounded-[1rem] object-cover object-center"
          /> */}
        </div>
        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default AddFood;
