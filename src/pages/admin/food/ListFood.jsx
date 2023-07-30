import React, { useEffect, useState } from "react";

import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBox from "../../../components/ConfirmBox";
import { getUserDataFromSessionStorage } from "../../../services/encode";
import { deleteFood, updateFood } from "../../../services/food";
import { fetchFoodByRestaurant } from "../../../store/foodsSlice";
import {
  fetchRestaurants,
  setRestaurantId,
} from "../../../store/restaurantSlice";
const ListFood = ({ foods, restaurants, restaurantId }) => {
  // const [foods, setFoods] = useState([]);
  // const [restaurants, setRestaurants] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const user = getUserDataFromSessionStorage();
  const dispatch = useDispatch();

  const handleDelete = async (foodId, restaurantId) => {
    try {
      deleteFood(foodId, restaurantId);
      // const listFoods = await getAllFoodInRestaurant(restaurantId);
      dispatch(fetchFoodByRestaurant({ restaurantId }));
      // setFoods(listFoods);
      setShowConfirm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeRestaurant = async (restaurantId) => {
    // const listFoods = await getAllFoodInRestaurant(restaurantId);
    dispatch(fetchFoodByRestaurant({ restaurantId }));
    dispatch(setRestaurantId(restaurantId));
    // setFoods(listFoods);
    setShouldRefresh(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };
  const handleUpdateStatus = async (food) => {
    var newFood = { ...food };
    if (food.is_active === 0) {
      newFood = { ...food, is_active: 1 };
    } else {
      newFood = { ...food, is_active: 0 };
    }
    await updateFood(food.id, food.restaurantId, newFood);
    // const listFoods = await getAllFoodInRestaurant(user.restaurantId);
    dispatch(
      fetchFoodByRestaurant({
        restaurantId: user.role === "ADMIN" ? restaurantId : user.restaurantId,
      })
    );
    // setFoods(listFoods);
  };
  useEffect(() => {
    if (restaurantId === null) {
      if (user.role === "ADMIN" && !shouldRefresh) {
        // fetchRestaurants();
        if (restaurants?.length > 0) {
          dispatch(fetchFoodByRestaurant({ restaurantId: restaurants[0].id }));
        } else {
          dispatch(fetchRestaurants());
        }
      } else {
        dispatch(fetchFoodByRestaurant({ restaurantId: user.restaurantId }));
      }
    }
  }, [
    dispatch,
    restaurantId,
    restaurants,
    shouldRefresh,
    user.restaurantId,
    user.role,
  ]);
  return (
    <div>
      <div>
        <div className="row">
          <h1 className="text-center">Danh sách sản phẩm</h1>
        </div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <div className="">
            {user.role === "ADMIN" ? (
              <div className="">
                <select
                  onChange={(e) => handleChangeRestaurant(e.target.value)}
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
              to="/admin/food/add"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            >
              <i className="fas fa-download fa-sm text-white-50" /> Thêm sản
              phẩm
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
          {foods &&
            foods?.length > 0 &&
            foods.map((food, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{food.name}</th>
                <th>
                  <img
                    className="rounded mx-auto d-block w-25 h-25"
                    src={food.imgSrc}
                    alt=""
                  />
                </th>
                <th>{food.price}</th>
                <th>{food.desc}</th>
                <th>
                  {food.is_active === 0 ? (
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
                    onConfirm={() => handleDelete(food.id, food.restaurantId)}
                    onCancel={() => handleCancel()}
                  />
                  <Link to={`/admin/food/edit/${user.restaurantId}/${food.id}`}>
                    <button className="btn btn-warning ms-1">Sửa</button>
                  </Link>
                  <button
                    className={`${
                      food.is_active === 0
                        ? "btn btn-secondary ms-1"
                        : "btn btn-success ms-1"
                    }`}
                    onClick={() => handleUpdateStatus(food)}
                  >
                    {food.is_active === 0 ? "Dừng" : "Bán"}
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
    foods: state.foods.foods,
    restaurants: state.restaurants.restaurants,
    restaurantId: state.restaurants.restaurantId,
  };
}
export default connect(mapStateToProps)(ListFood);
