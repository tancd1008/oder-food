import React, { useEffect, useState } from "react";

import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBox from "../../../components/ConfirmBox";
import { getUserDataFromSessionStorage } from "../../../services/encode";

import { setFoods } from "../../../store/foodsSlice";
import {
  fetchRestaurants,
  setRestaurantId,
} from "../../../store/restaurantSlice";
import { fetchVoucherRestaurant } from "../../../store/vouchersSlide";
const ListVoucher = ({ voucher, restaurants, restaurantId }) => {
  console.log(restaurantId)
  const [showConfirmMap, setShowConfirmMap] = useState({});
  const user = getUserDataFromSessionStorage();
  const dispatch = useDispatch();
  const handleChangeRestaurant = async (restaurantId) => {
    dispatch(fetchVoucherRestaurant({ restaurantId }));
    dispatch(setRestaurantId(restaurantId));
    dispatch(setFoods());
  };

  const handleDelete = (voucherId) => {
   
  };

  const handleCancel = (voucherId) => {
    setShowConfirmMap((prev) => ({ ...prev, [voucherId]: false }));
  };
  const handleUpdateStatus = async (voucher, restaurantId) => {
   
  };
  useEffect(() => {
    console.log(restaurantId)
    if (
      restaurantId === null ||
      (restaurantId !== null && voucher === null)
    ) {
      if (user.role === "ADMIN") {
        if (restaurants?.length > 0) {
          if (restaurantId === null) {
            dispatch(
              fetchVoucherRestaurant({ restaurantId: restaurants[0].id })
            );
            dispatch(setRestaurantId(restaurants[0].id));
          } else {
            dispatch(fetchVoucherRestaurant({ restaurantId }));
          }
        } else {
          dispatch(fetchRestaurants());
        }
      } else {
        console.log(restaurantId)
        dispatch(
          fetchVoucherRestaurant({ restaurantId: user.restaurantId })
        );
        dispatch(setRestaurantId(user.restaurantId));
      }
    }
  }, [
    voucher,
    dispatch,
    restaurantId,
    restaurants,
    user.restaurantId,
    user.role,
  ]);
 
  return (
    <div>
      <div>
        <div className="row">
          <h1 className="text-center">Danh sách Voucher</h1>
        </div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <div className="">
            {user.role === "ADMIN" ? (
              <div className="">
                <select
                  onChange={(e) => {
                    handleChangeRestaurant(e.target.value);
                  }}
                  value={restaurantId}
                  name=""
                  id=""
                >
                  {restaurants &&
                    restaurants?.length > 0 &&
                    restaurants.map((restaurant, index) => (
                      <option value={restaurant.id} key={index}>
                        {restaurant.nameRestaurant}
                      </option>
                    ))}
                </select>
              </div>
            ) : null}
          </div>
          <div className="">
            <Link
              to="/admin/voucher/add"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            >
              <i className="fas fa-download fa-sm text-white-50" /> Thêm Voucher
            </Link>
          </div>
          <div></div>
        </div>
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
          {voucher &&
            voucher?.length > 0 &&
            voucher.map((voucher, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{voucher.name}</th>
                <th>
                  <img
                    className="rounded mx-auto d-block w-25 h-25"
                    src={voucher.imgSrc}
                    alt=""
                  />
                </th>
                <th>{voucher.price}</th>
                <th>{voucher.desc}</th>
                <th>
                  {voucher.is_active === 0 ? (
                    <p className="text-success">Hoạt động</p>
                  ) : (
                    <p className="text-danger">Ngừng bán</p>
                  )}
                </th>
                <th className="">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(voucher.id)}
                  >
                    Xóa
                  </button>
                  <ConfirmBox
                    show={showConfirmMap[voucher.id]}
                    message="Bạn có chắc chắn muốn xóa bản ghi này không?"
                    onConfirm={() => handleDelete(voucher.id, restaurantId)}
                    onCancel={() => handleCancel(voucher.id)}
                  />
                  <Link
                    to={`/admin/voucher/edit/${restaurantId}/${voucher.id}`}
                  >
                    <button className="btn btn-warning ms-1">Sửa</button>
                  </Link>
                  <button
                    className={`${
                      voucher.is_active === 0
                        ? "btn btn-secondary ms-1"
                        : "btn btn-success ms-1"
                    }`}
                    onClick={() => handleUpdateStatus(voucher, restaurantId)}
                  >
                    {voucher.is_active === 0 ? "Dừng" : "Bán"}
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
function mapStateToProps(state) {
  console.log(state)
  return {
    voucher: state.voucher.voucher,
    restaurants: state.restaurants.restaurants,
    restaurantId: state.restaurants.restaurantId,
  };
}

export default connect(mapStateToProps)(ListVoucher);