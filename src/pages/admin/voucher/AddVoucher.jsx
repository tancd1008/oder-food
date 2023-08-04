import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createVoucher } from "../../../store/vouchersSlide";
const initialState = {
  name: "",
  discount: "",
  time_start: "",
  time_end: "",
  is_active: 0,
  restaurantId: "",
};
const AddVoucher = ({ restaurantId }) => {
  const [state, setState] = useState(initialState);
  const { name, discount, time_start, time_end } = state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !discount) {
      toast.error("Mời bạn nhập!");
    } else {
      try {
        console.log(restaurantId);

        dispatch(createVoucher({ voucher: state, restaurantId }));
        toast.success("Bạn thêm voucher thành công!");
        setTimeout(() => {
          navigate("/admin/voucher/list");
        }, 3000);
      } catch (error) {
        toast.error("Lỗi");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Thêm mới voucher</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Tên voucher
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Voucher"
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="discount" className="form-label">
            Giảm giá
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            className="form-control"
            placeholder="giảm giá"
            value={discount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time_start" className="form-label">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            id="time_start"
            name="time_start"
            className="form-control"
            placeholder="dd/mm/yyyy"
            value={time_start}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time_end" className="form-label">
            Ngày kết thúc
          </label>
          <input
            type="date"
            id="time_end"
            name="time_end"
            className="form-control"
            placeholder="dd/mm/yyyy"
            value={time_end}
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
  console.log(state);
  return {
    restaurantId: state.restaurants.restaurantId,
  };
}
export default connect(mapStateToProps)(AddVoucher);
