import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOptionsFromData } from "../../../helper/optionsSelect";
import { getAllCategoriesInRestaurant } from "../../../services/category";
import { createFood } from "../../../store/foodsSlice";
const initialState = {
  id: "",
  name: "",
  price: "",
  desc: "",
  imgSrc: "",
  categoryId: [],
  is_active: 0,
};

const AddFood = ({ restaurantId }) => {
  const [state, setState] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    desc: "",
    imgSrc: "",
    categoryId: [],
    is_active: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, price, desc } = state;

  function areAllValuesFilled(obj) {
    const invalidFields = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === "number" && isNaN(value))
        ) {
          invalidFields.push(key);
        }
      }
    }
    return { isValid: invalidFields.length === 0, invalidFields };
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({
      name: "",
      price: "",
      desc: "",
      imgSrc: "",
      categoryId: [],
      is_active: 0,
    });
    if (!e.target.files) {
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, imgSrc: e.target.files[0] });
    }
  };
  const handleSelectChange = (selectedOptions) => {
    var newArray = [];
    if (selectedOptions.length > 0) {
      newArray = selectedOptions.map((item) => item.value);
    }
    setState({
      ...state,
      categoryId: newArray,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFoodData = { ...state };
    const validationObj = state;
    delete validationObj.id;
    const validation = areAllValuesFilled(validationObj);

    if (validation.isValid) {
      try {
        dispatch(createFood({ food: newFoodData, restaurantId }));
        toast.success("Food added successfully!", {
          onClose: () => {
            navigate("/admin/food/list"); // Chuyển trang sau khi toast biến mất
          },
        });
      } catch (error) {
        toast.error("Failed to add food!");
      }
    } else {
      var newError = errors;
      validation.invalidFields.map((item) => {
        newError[item] = "Must not be left blank";
        return true;
      });
      setErrors({ ...errors, newError });
    }
  };
  useEffect(() => {
    const getCategory = async () => {
      const valueKeys = ["id", "name"];
      const labelKeys = ["value", "label"];
      const listCategories = await getAllCategoriesInRestaurant(restaurantId);
      setCategories(
        createOptionsFromData(listCategories, valueKeys, labelKeys)
      );
    };
    getCategory();
  }, [restaurantId]);

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
          {errors.name.length > 0 && (
            <p className="text-danger">{errors.name}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Danh mục
          </label>

          <Select
            isMulti
            name="categories"
            options={categories}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
          />
          {errors.categoryId.length > 0 && (
            <p className="text-danger">{errors.categoryId}</p>
          )}
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
          {errors.price.length > 0 && (
            <p className="text-danger">{errors.price}</p>
          )}
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
          {errors.desc.length > 0 && (
            <p className="text-danger">{errors.desc}</p>
          )}
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
          {errors.imgSrc.length > 0 && (
            <p className="text-danger">{errors.imgSrc}</p>
          )}
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
function mapStateToProps(state) {
  return {
    restaurantId: state.restaurants.restaurantId,
  };
}
export default connect(mapStateToProps)(AddFood);
