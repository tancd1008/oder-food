import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOptionsFromData } from "../../../helper/optionsSelect";
import { getAllCategoriesInRestaurant } from "../../../services/category";
import { getDetailFood, updateFood } from "../../../services/food";

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
  const [selectOld, setSelectOld] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    desc: "",
    imgSrc: "",
    categoryId: [],
    is_active: 0,
  });
  const { restaurantId, foodId } = useParams();

  const navigate = useNavigate();
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
    setErrors({
      name: "",
      price: "",
      desc: "",
      imgSrc: "",
      categoryId: [],
      is_active: 0,
    });
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
    const validationObj = state;
    delete validationObj.id;
    const validation = areAllValuesFilled(validationObj);
    if (validation.isValid) {
      try {
        await updateFood(foodId, restaurantId, state);
        toast.success("Cập nhật sản phẩm thành công", {
          onClose: () => {
            navigate("/admin/food/list"); // Chuyển trang sau khi toast biến mất
          },
        });
      } catch (error) {
        toast.error("Lỗi");
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
    const getFood = async () => {
      const valueKeys = ["id", "name"];
      const labelKeys = ["value", "label"];
      const foodDoc = await getDetailFood(foodId, restaurantId);
      const listCategories = await getAllCategoriesInRestaurant(restaurantId);
      setCategories(
        createOptionsFromData(listCategories, valueKeys, labelKeys)
      );
      var convertedOptions = createOptionsFromData(
        listCategories,
        valueKeys,
        labelKeys
      ).filter((item) =>
        foodDoc.data().categoryId.some((value) => value === item.value)
      );
      setState(foodDoc.data());
      setSelectOld(convertedOptions);
    };
    getFood();
  }, [restaurantId, foodId]);
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
          {errors.name.length > 0 && (
            <p className="text-danger">{errors.name}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Danh mục
          </label>
          {selectOld && selectOld?.length > 0 && (
            <Select
              isMulti
              name="categories"
              options={categories}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
              defaultValue={selectOld}
            />
          )}
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
            value={state.price}
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
            value={state.desc}
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
          Cập nhật
        </button>

        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default EditFood;
