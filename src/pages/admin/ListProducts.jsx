import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

import 'react-toastify/dist/ReactToastify.css';
import { deleteProduct, updateProduct } from "../../services/products";
import { ToastContainer, toast } from "react-toastify";
const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
  const handleDelete =  (productId) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa?');
    if (confirm) {
      // Xử lý xóa dữ liệu ở đây
      deleteProduct(productId);
      console.log('Đã xóa');
      toast.success('Đã xóa thành công');
    }
    
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
              <th>{product.price}</th>
              <th>{product.desc}</th>
              <th >{product.status === 0 ? <p className="text-success">Hoạt động</p> : <p className="text-danger">Ngừng bán</p>}</th>
              <th className="">
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Xóa</button>
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
