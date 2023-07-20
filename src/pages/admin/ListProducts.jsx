import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBox from "../../components/ConfirmBox";
import { deleteProduct, updateProduct } from "../../services/products";
const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const db = getDatabase();
      const productRef = ref(db, "products/");
      onValue(productRef, (snapshot) => {
        var newData = [];
        snapshot.forEach((item) => {
          newData.push(item.val());
        });
        setProducts(newData);
      });
    };
    getProducts();
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

  return (
    <div>
      <h1 className="text-center">Danh sách sản phẩm</h1>
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
                <button className="btn btn-warning ms-1">Sửa</button>
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

export default ListProducts;
