import React from "react";

const AddRestaurant = () => {
  const handleSubmit = () => {};
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Địa chỉ
          </label>
          <input
            type="text"
            id="pdescrice"
            name="desc"
            className="form-control"
            placeholder="Địa chỉ"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Email chủ nhà hàng
          </label>
          <input
            type="text"
            id="pdescrice"
            name="desc"
            className="form-control"
            placeholder="Email"
          />
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            id="pdescrice"
            name="desc"
            className="form-control"
            placeholder="Số điện thoại"
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
