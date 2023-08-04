import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCategory } from "../../../store/categoriesSlide";
const initialState = {
  name: "",
  desc: "",
  is_active: 0,
  restaurantId: "",
};
const AddCategory = ({ restaurantId }) => {
  const [state, setState] = useState(initialState);
  const { name, desc } = state;
  // const user = getUserDataFromSessionStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !desc) {
      toast.error("Mời bạn nhập!");
    } else {
      try {
        dispatch(createCategory({ category: state, restaurantId }));
        // addCategory(state, restaurantId);
        toast.success("Bạn thêm danh mục thành công!");
        setTimeout(() => {
          navigate("/admin/category/list");
        }, 3000);
      } catch (error) {
        toast.error("Lỗi");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Thêm mới danh mục</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Tên danh mục
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Sản phẩm"
            value={name}
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
            className="form-control"
            placeholder="Nội dung..."
            value={desc}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Thêm mới
        </button>
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
export default connect(mapStateToProps)(AddCategory);
