import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editOptions } from "../../../store/optionsSlice";
import { getDetailOptions } from "../../../services/options";
const initialState = {
  name: "",
  price: "",
  is_active: 0,
  restaurantId: "",
};
const EditOptions = () => {
  const [state, setState] = useState(initialState);
  const { name, price } = state;
  const { restaurantId, optionsId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      toast.error("Mời bạn nhập!");
    } else {
      try {
        dispatch(editOptions({ optionsId, options: state, restaurantId }));
        toast.success("Successfully");
        setTimeout(() => {
          navigate("/admin/options/list");
        }, 3000);
      } catch (error) {
        toast.error("Lỗi");
      }
    }
  };
  useEffect(() => {
    const getOptions = async () => {
      const optionsDoc = await getDetailOptions(optionsId, restaurantId);
      setState(optionsDoc);
    };
    getOptions();
  }, [restaurantId, optionsId]);
  console.log(state);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Cập nhật Options</h1>
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
            value={state.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Giá
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="form-control"
            placeholder="Giá"
            value={state.price}
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

export default EditOptions;
