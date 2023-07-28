import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBox from "../../../components/ConfirmBox";
import { deleteProduct } from "../../../services/food";
import { Link } from "react-router-dom";
import { deleteCategory, getAllCategoriesInRestaurant, updateCategory } from "../../../services/category";
import { getAllRestaurants } from "../../../services/restaurents";
const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  
  useEffect(() => {
    const getCategory = async () => {
      try {
        if (!user.restaurantId) {
        } else {
          const listCategories = await getAllCategoriesInRestaurant(
            user.restaurantId
          );
          setCategories(listCategories);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh mục:", error);
      }
    };
    const fetchRestaurants = async () => {
      const restaurantList = await getAllRestaurants();
      setRestaurants(restaurantList);
    };
    fetchRestaurants();
    getCategory();
  }, []);
  const handleDelete = async (categoryId,restaurantId) => {
    console.log("categoryId", categoryId);
    deleteCategory(categoryId,restaurantId);
    const listCategories = await getAllCategoriesInRestaurant(
      user.restaurantId
    );
    setCategories(listCategories);
    setShowConfirm(false);
  };
  const handleCancel = () => {
    setShowConfirm(false);
  };
  const handleUpdateStatus = async (category, restaurantId) => {
    var newCategory = { ...category };
    if (category.is_active === 0) {
      newCategory = { ...category, is_active: 1 };
      console.log("1");
    } else {
      console.log("0");
      newCategory = { ...category, is_active: 0 };
    }
    await updateCategory(category.id,restaurantId, newCategory);
    const listCategories = await getAllCategoriesInRestaurant(restaurantId);
      setCategories(listCategories);
    
    console.log(newCategory);
  };
  console.log(restaurants);
  return (
    <div>
      <div>
        <div className="row">
          <h1 className="text-center">Danh sách danh mục</h1>
        </div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <div className="">
            {user.role === "ADMIN" ? (
               <div className="">
               <select name="" id="">
                 {restaurants.map((restaurant, index) => (
                   <option value={restaurant.id} key={index}>
                     {restaurant.nameRestaurant}
                   </option>
                 ))}
               </select>
             </div>
            ): null}
            
          </div>
          <div className="">
            <Link
              to="/admin/category/add"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            >
              <i className="fas fa-download fa-sm text-white-50" /> Thêm danh
              mục
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
          {categories.map((category, index) => (
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
                  onClick={() => setShowConfirm(true)}
                >
                  Xóa
                </button>
                <ConfirmBox
                  show={showConfirm}
                  message="Bạn có chắc chắn muốn xóa bản ghi này không?"
                  onConfirm={() => handleDelete(category.id,user.restaurantId)}
                  onCancel={() => handleCancel()}
                />
                <Link to={`/admin/category/edit/${user.restaurantId}/${category.id}`}>
                  <button className="btn btn-warning ms-1">Sửa</button>
                </Link>
                <button
                  className={`${
                    category.is_active === 0
                      ? "btn btn-secondary ms-1"
                      : "btn btn-success ms-1"
                  }`}
                  onClick={() => handleUpdateStatus(category,user.restaurantId)}
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

export default ListCategories;
