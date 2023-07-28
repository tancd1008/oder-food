import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBox from "../../../components/ConfirmBox";
import { Link } from "react-router-dom";
import { getAllCategoriesInRestaurant } from "../../../services/category";
import { getAllRestaurants } from "../../../services/restaurents";
const ListFood = () => {
  const [products, setProducts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
   
    const fetchRestaurants = async () => {
      const restaurantList = await getAllRestaurants();
      setRestaurants(restaurantList);
    };
    fetchRestaurants();
  }, []);
  const handleDelete = (id) => {
    console.log("id", id);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };
  const handleUpdateStatus = (product) => {
    var newProduct = {...product}
    if(product.status === 0) {
       newProduct = {...product, status: 1}
      console.log("1")
    }else{
      console.log("0")
       newProduct = {...product, status: 0}
    }
    console.log(newProduct)
  }

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

          <Link to="/admin/food/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Thêm sản phẩm</Link>
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
          {products.map((product, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{product.name}</th>
              <th>
                <img className="rounded mx-auto d-block w-25 h-25" src={product.imgSrc} alt=""/>
              </th>
              <th>{product.price}</th>
              <th>{product.desc}</th>
              <th >{product.status === 0 ? <p className="text-success">Hoạt động</p> : <p className="text-danger">Ngừng bán</p>}</th>
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
                  onCancel={()=>handleCancel()}
                />
                <Link to={`/admin/products/edit/${product.id}`}>
                <button className="btn btn-warning ms-1">Sửa</button>
                </Link>
                <button className={`${product.status === 0 ? "btn btn-secondary ms-1" : "btn btn-success ms-1"}`}  onClick={() => handleUpdateStatus(product)}>{product.status === 0 ? "Dừng" : "Bán"}</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ListFood;
