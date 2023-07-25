import { getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const innititalState = {
  name: "",
  desc: "",
};
const AddCategory = () => {
  const [state, setState] = useState(innititalState);
  const { name, desc } = state;
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !desc) {
      toast.error("Mời bạn nhập!");
    } else {
      const db = getDatabase(); 
      const categoriesRef = ref(db, 'categories/');
      const newCategoryRef = push(categoriesRef);
      const newCategoryId = newCategoryRef.key;
      const newCategoryData = {...state, id: newCategoryId};
      set(newCategoryRef,newCategoryData).then(() => {
        toast.success("Thêm danh mục thành công")
        setTimeout(() => {
          navigate("/admin")
        },3000)
      })
      .catch((error) => {
        toast.error("Lỗi")
      });
     
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Thêm mới danh mục</h1>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
          >
            Tên danh mục
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Sản phẩm"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
          >
            Nội dung
          </label>
          <input
            type="text"
            id="pdescrice"
            name="desc"
            className="form-control"
            placeholder="Nội dung..."
            value={desc}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Thêm mới
        </button>
        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default AddCategory;
