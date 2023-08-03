import React, { useEffect, useState } from "react";

import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBox from "../../../components/ConfirmBox";
import { updateCategory } from "../../../services/category";
import { getUserDataFromSessionStorage } from "../../../services/encode";
import {
  fetchCategoriesByRestaurant,
  removeCategory,
} from "../../../store/categoriesSlide";
import { setFoods } from "../../../store/foodsSlice";
import {
  fetchRestaurants,
  setRestaurantId,
} from "../../../store/restaurantSlice";
const ListOptions = ({ categories, restaurants, restaurantId }) => {
  const [showConfirmMap, setShowConfirmMap] = useState({});
  const user = getUserDataFromSessionStorage();
  const dispatch = useDispatch();
  const handleChangeRestaurant = async (restaurantId) => {
    dispatch(fetchCategoriesByRestaurant({ restaurantId }));
    dispatch(setRestaurantId(restaurantId));
    dispatch(setFoods());
  };

  const handleDelete = (categoryId) => {
    dispatch(removeCategory({ categoryId, restaurantId }));
    setShowConfirmMap((prev) => ({ ...prev, [categoryId]: true }));
  };

  const handleCancel = (categoryId) => {
    setShowConfirmMap((prev) => ({ ...prev, [categoryId]: false }));
  };
  const handleUpdateStatus = async (category, restaurantId) => {
    var newCategory = { ...category };
    if (category.is_active === 0) {
      newCategory = { ...category, is_active: 1 };
    } else {
      newCategory = { ...category, is_active: 0 };
    }
    await updateCategory(category.id, restaurantId, newCategory);
    dispatch(
      fetchCategoriesByRestaurant({
        restaurantId,
      })
    );
  };
  useEffect(() => {
    if (
      restaurantId === null ||
      (restaurantId !== null && categories === null)
    ) {
      if (user.role === "ADMIN") {
        if (restaurants?.length > 0) {
          if (restaurantId === null) {
            dispatch(
              fetchCategoriesByRestaurant({ restaurantId: restaurants[0].id })
            );
            dispatch(setRestaurantId(restaurants[0].id));
          } else {
            dispatch(fetchCategoriesByRestaurant({ restaurantId }));
          }
        } else {
          dispatch(fetchRestaurants());
        }
      } else {
        dispatch(
          fetchCategoriesByRestaurant({ restaurantId: user.restaurantId })
        );
        dispatch(setRestaurantId(user.restaurantId));
      }
    }
  }, [
    categories,
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
          {categories &&
            categories?.length > 0 &&
            categories.map((category, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{category.name}</th>
                <th>
                  <img
                    className="rounded mx-auto d-block w-25 h-25"
                    src={category.imgSrc}
                    alt=""
                  />
                </th>
                <th>{category.price}</th>
                <th>{category.desc}</th>
                <th>
                  {category.is_active === 0 ? (
                    <p className="text-success">Hoạt động</p>
                  ) : (
                    <p className="text-danger">Ngừng bán</p>
                  )}
                </th>
                <th className="">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(category.id)}
                  >
                    Xóa
                  </button>
                  <ConfirmBox
                    show={showConfirmMap[category.id]}
                    message="Bạn có chắc chắn muốn xóa bản ghi này không?"
                    onConfirm={() => handleDelete(category.id, restaurantId)}
                    onCancel={() => handleCancel(category.id)}
                  />
                  <Link
                    to={`/admin/category/edit/${restaurantId}/${category.id}`}
                  >
                    <button className="btn btn-warning ms-1">Sửa</button>
                  </Link>
                  <button
                    className={`${
                      category.is_active === 0
                        ? "btn btn-secondary ms-1"
                        : "btn btn-success ms-1"
                    }`}
                    onClick={() => handleUpdateStatus(category, restaurantId)}
                  >
                    {category.is_active === 0 ? "Dừng" : "Bán"}
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
  return {
    categories: state.categories.categories,
    restaurants: state.restaurants.restaurants,
    restaurantId: state.restaurants.restaurantId,
  };
}

export default connect(mapStateToProps)(ListOptions);
