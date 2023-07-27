import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBox from "../../../components/ConfirmBox";
import { deleteProduct, updateProduct } from "../../../services/products";
import { Link } from "react-router-dom";
import { getAllCategoriesInRestaurant } from "../../../services/category";
const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    const getCategory = async () => {
      try {
        const listCategories = await getAllCategoriesInRestaurant(user.restaurantId);
     setCategories(listCategories)
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh mục:", error);
      }
     
    };
    getCategory();
  }, []);
  const handleDelete = (id) => {
    console.log("id", id);
    deleteProduct(id);
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
    updateProduct(product.id,newProduct)
    console.log(newProduct)
  }
  console.log(categories)
  return (
    <div>
      <div>
        <div className="row">

      <h1 className="text-center">Danh sách danh mục</h1> 
        </div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <div className="">
          <select name="" id="">
            <option value="">Nhà hàng 1</option>
          </select>
          </div>
          <div className="">

          <Link to="/admin/category/add" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Thêm danh mục</Link>
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
                <img className="rounded mx-auto d-block w-25 h-25" src={category.imgSrc} alt=""/>
              </th>
              <th>{category.price}</th>
              <th>{category.desc}</th>
              <th >{category.status === 0 ? <p className="text-success">Hoạt động</p> : <p className="text-danger">Ngừng bán</p>}</th>
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
                  onConfirm={() => handleDelete(category.id)}
                  onCancel={()=>handleCancel()}
                />
                <Link to={`/admin/category/edit/${category.id}`}>
                <button className="btn btn-warning ms-1">Sửa</button>
                </Link>
                <button className={`${category.status === 0 ? "btn btn-secondary ms-1" : "btn btn-success ms-1"}`}  onClick={() => handleUpdateStatus(category)}>{category.status === 0 ? "Dừng" : "Bán"}</button>
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
