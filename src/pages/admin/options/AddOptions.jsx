import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOptions } from "../../../store/optionsSlice";
const initialState = {
  name: "",
  price: "",
  is_active: 0,
  restaurantId: "",
};
const AddCategory = ({ restaurantId }) => {
  const [state, setState] = useState(initialState);
  const { name, price } = state;
  // const user = getUserDataFromSessionStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      toast.error("Mời bạn nhập!");
    } else {
      try {
        dispatch(createOptions({options: state, restaurantId}))
        toast.success("Bạn thêm options thành công!");
        setTimeout(() => {
          navigate("/admin/options/list");
        }, 3000);
      } catch (error) {
        toast.error("Lỗi");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Thêm mới options</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Tên options
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Options"
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Giá
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            placeholder="Nội dung..."
            value={price}
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
