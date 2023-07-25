import React, { useState } from "react";
import { createRestaurant } from "../../../services/restaurents";
const initialState = {
  nameRestaurant: "",
  address:""
};
const AddRestaurant = () => {
  const [state, setState] = useState(initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createRestaurant(state)
    console.log(state);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Thêm mới nhà hàng</h1>
        <div className="mb-3">
          <label htmlFor="nameRestaurant" className="form-label">
            Tên nhà hàng
          </label>
          <input
            type="text"
            id="nameRestaurant"
            name="nameRestaurant"
            className="form-control"
            placeholder="Nhà Hàng"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            placeholder="Địa chỉ"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email chủ nhà hàng
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            placeholder="Số điện thoại"
            onChange={handleInputChange}

          />
        </div>{" "}
        <button type="submit" className="btn btn-primary">
          Thêm mới
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
