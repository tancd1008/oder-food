import React, { useState } from "react";
import { createRestaurant } from "../../../services/restaurents";
import Select from "react-select";

import "./../../../styles/time-picker.css"

const initialState = {
  nameRestaurant: "",
  address:"",
  status: 0
};
// const options = [
//   { value: "00:00", label: "00:00" },
//   { value: "00:30", label: "00:30" },
//   { value: "01:00", label: "01:00" },
//   { value: "01:30", label: "01:30" },
//   { value: "02:00", label: "02:00" },
//   { value: "02:30", label: "02:30" },
//   { value: "03:00", label: "03:00" },
//   { value: "03:30", label: "03:30" },
//   { value: "04:00", label: "04:00" },
//   { value: "00:00", label: "00:00" },
//   { value: "00:00", label: "00:00" },
//   { value: "00:00", label: "00:00" },
//   { value: "00:00", label: "00:00" },
//   { value: "00:00", label: "00:00" },
//   { value: "00:00", label: "00:00" },
//   { value: "00:00", label: "00:00" },
//   { value: "00:00", label: "00:00" },
//   { value: "00:00", label: "00:00" },
//   { value: "00:00", label: "00:00" },
 
// ];
const AddRestaurant = () => {
  const [state, setState] = useState(initialState);
  const [selectedTime, setSelectedTime] = useState('12:00')
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // createRestaurant(state)
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
        <div className="mb-3 row">
        <div className="col row">
            <div className="col col-md-auto p-2">

            <label>Giờ mở cửa</label>
            </div>
            <div className="col">
            <input
            type="time"
            id="time_start"
            name="time_start"
            className="form-control"
            placeholder="Số điện thoại"
            onChange={handleInputChange}

          />
          {/* <Select
            name="time_start"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleTimeSelect}
          /> */}
            </div>
          </div>
          <div className="col row">
            <div className="col col-md-auto p-2">

            <label>Giờ đóng cửa</label>
            </div>
            <div className="col">
            <input
            type="time"
            id="time_end"
            name="time_end"
            className="form-control"
            placeholder="Số điện thoại"
            onChange={handleInputChange}

          />
          {/* <Select
            name="time_end"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleTimeSelect}
          /> */}
            </div>
          </div>
        </div>
       
        
        <button type="submit" className="btn btn-primary">
          Thêm mới
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
