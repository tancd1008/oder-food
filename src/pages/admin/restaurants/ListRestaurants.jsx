import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBox from "../../../components/ConfirmBox";
import {
  getAllRestaurants,
  updateRestaurant,
} from "../../../services/restaurants";
const ListRestaurants = () => {
  const [products, setProducts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleDelete = (id) => {
    // console.log("id", id);
    // deleteProduct(id);
    // setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };
  const handleUpdateStatus = (product) => {
    var updateData = product;
    updateData.status = product?.status === 0 ? 1 : 0;
    updateRestaurant(updateData);
    setShouldRefresh(true);
  };
  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurantList = await getAllRestaurants();
      setProducts(restaurantList);
    };
    fetchRestaurants();
    setShouldRefresh(false);
  }, [shouldRefresh]);
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="text-center">Danh sách nhà hàng</h1>
        <Link
          to="/admin/restaurant/add"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50" /> Thêm nhà hàng
        </Link>
      </div>
      <table className="table table-hover text-nowrap">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Sản phảm</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Giá</th>
            <th scope="col">Nội dung</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{product.email}</th>
              <th>
                <img
                  className="rounded mx-auto d-block w-25 h-25"
                  src={product.imgSrc}
                  alt=""
                />
              </th>
              <th>{product.address}</th>
              <th>{product.desc}</th>
              <th>
                {product.status === 0 ? (
                  <p className="text-success">Hoạt động</p>
                ) : (
                  <p className="text-danger">Ngừng bán</p>
                )}
              </th>
              <th className="">
                <button
                  className="btn btn-danger"
                  onClick={() => setShowConfirm(true)}
                >
                  Xóa
                </button>
                <ConfirmBox
                  show={showConfirm}
                  message="Bạn có chắc chắn muốn xóa bản ghi này không?"
                  onConfirm={() => handleDelete(product.id)}
                  onCancel={() => handleCancel()}
                />
                <Link to={`/admin/products/edit/${product.id}`}>
                  <button className="btn btn-warning ms-1">Sửa</button>
                </Link>
                <button
                  className={`${
                    product.status === 0
                      ? "btn btn-secondary ms-1"
                      : "btn btn-success ms-1"
                  }`}
                  onClick={() => handleUpdateStatus(product)}
                >
                  {product.status === 0 ? "Dừng" : "Bán"}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ListRestaurants;
