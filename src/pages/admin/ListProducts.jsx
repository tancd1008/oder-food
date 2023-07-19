import React from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-toastify/dist/ReactToastify.css";
import fireDb from "../../firebase-config";
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
  const handleDelete = async (productId) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (confirm) {
      const db = getDatabase(); // Kết nối
      console.log(db)
      const productRef = ref(db,"products/" + productId);

      // Thực hiện xóa sản phẩm
      productRef
        .remove()
        .then(() => {
          toast.success("Sản phẩm đã được xóa");
        })
        .catch((error) => {
          toast.error("Lỗi khi xóa sản phẩm:", error);
        });
      
    }
  };

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
              <th className="text-success">Hoạt động</th>
              <th className="">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Xóa
                </button>
                <button className="btn btn-warning ms-1">Sửa</button>
                <button className="btn btn-secondary ms-1">Dừng</button>
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
