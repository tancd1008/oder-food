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
import { fetchOptionsRestaurant, removeOptions } from "../../../store/optionsSlice";
import { updateOptions } from "../../../services/options";
const ListOptions = ({ options, restaurants, restaurantId }) => {
    console.log(restaurantId)
  const [showConfirmMap, setShowConfirmMap] = useState({});
  const user = getUserDataFromSessionStorage();
  const dispatch = useDispatch();
  const handleChangeRestaurant = async (restaurantId) => {
    dispatch(fetchOptionsRestaurant({ restaurantId }));
    dispatch(setRestaurantId(restaurantId));
    dispatch(setFoods());
  };

  const handleDelete = (optionsId) => {
    dispatch(removeOptions({ optionsId, restaurantId }));
    setShowConfirmMap((prev) => ({ ...prev, [optionsId]: true }));
  };

  const handleCancel = (optionsId) => {
    setShowConfirmMap((prev) => ({ ...prev, [optionsId]: false }));
  };
  const handleUpdateStatus = async (options, restaurantId) => {
    var newOptions = { ...options };
    console.log(newOptions)
    if (options.is_active === 0) {
        newOptions = { ...options, is_active: 1 };
    } else {
        newOptions = { ...options, is_active: 0 };
    }
    await updateOptions(options.id, newOptions, restaurantId);
    dispatch(
      fetchOptionsRestaurant({
        restaurantId,
      })
    );
  };
  useEffect(() => {
    console.log(restaurantId)
    if (
      restaurantId === null ||
      (restaurantId !== null && options === null)
    ) {
      if (user.role === "ADMIN") {
        if (restaurants?.length > 0) {
          if (restaurantId === null) {
            dispatch(
              fetchOptionsRestaurant({ restaurantId: restaurants[0].id })
            );
            dispatch(setRestaurantId(restaurants[0].id));
          } else {
            dispatch(fetchOptionsRestaurant({ restaurantId }));
          }
        } else {
          dispatch(fetchRestaurants());
        }
      } else {
        console.log(restaurantId)
        dispatch(
          fetchOptionsRestaurant({ restaurantId: user.restaurantId })
        );
        dispatch(setRestaurantId(user.restaurantId));
      }
    }
  }, [
    options,
    dispatch,
    restaurantId,
    restaurants,
    user.restaurantId,
    user.role,
  ]);
  console.log(options)
  return (
    <div>
      <div>
        <div className="row">
          <h1 className="text-center">Danh sách options</h1>
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
              to="/admin/options/add"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            >
              <i className="fas fa-download fa-sm text-white-50" /> Thêm options
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
          {options &&
            options?.length > 0 &&
            options.map((options, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{options.name}</th>
                <th>
                  <img
                    className="rounded mx-auto d-block w-25 h-25"
                    src={options.imgSrc}
                    alt=""
                  />
                </th>
                <th>{options.price}</th>
                <th>{options.desc}</th>
                <th>
                  {options.is_active === 0 ? (
                    <p className="text-success">Hoạt động</p>
                  ) : (
                    <p className="text-danger">Ngừng bán</p>
                  )}
                </th>
                <th className="">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(options.id)}
                  >
                    Xóa
                  </button>
                  <ConfirmBox
                    show={showConfirmMap[options.id]}
                    message="Bạn có chắc chắn muốn xóa bản ghi này không?"
                    onConfirm={() => handleDelete(options.id, restaurantId)}
                    onCancel={() => handleCancel(options.id)}
                  />
                  <Link
                    to={`/admin/options/edit/${restaurantId}/${options.id}`}
                  >
                    <button className="btn btn-warning ms-1">Sửa</button>
                  </Link>
                  <button
                    className={`${
                      options.is_active === 0
                        ? "btn btn-secondary ms-1"
                        : "btn btn-success ms-1"
                    }`}
                    onClick={() => handleUpdateStatus(options, restaurantId)}
                  >
                    {options.is_active === 0 ? "Dừng" : "Bán"}
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
    options: state.options.options,
    restaurants: state.restaurants.restaurants,
    restaurantId: state.restaurants.restaurantId,
  };
}

export default connect(mapStateToProps)(ListOptions);
