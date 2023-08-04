import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDetailVoucher } from "../../../services/voucher";
import { editVoucher } from "../../../store/vouchersSlide";
const initialState = {
  name: "",
  discount: "",
  time_start: "",
  time_end: "",
  is_active: 0,
  restaurantId: "",
};
const EditVoucher = () => {
  const [state, setState] = useState(initialState);
  const { name, discount } = state;
  const { restaurantId, voucherId } = useParams();
  console.log(restaurantId);
  console.log(voucherId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !discount) {
      toast.error("Mời bạn nhập!");
    } else {
      try {
        dispatch(editVoucher({ voucherId, voucher: state, restaurantId }));
        toast.success("Successfully");
        setTimeout(() => {
          navigate("/admin/voucher/list");
        }, 3000);
      } catch (error) {
        toast.error("Lỗi");
      }
    }
  };
  useEffect(() => {
    const getVoucher = async () => {
      const voucherDoc = await getDetailVoucher(voucherId, restaurantId);
      console.log(voucherDoc);
      setState(voucherDoc);
    };
    getVoucher();
  }, [restaurantId, voucherId]);
  console.log(state);
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
            value={state.name}
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
            value={state.discount}
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
            value={state.time_start}
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
            value={state.time_end}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default EditVoucher;
