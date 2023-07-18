import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, push } from "firebase/database";
const innititalState = {
  name: "",
  desc: "",
};
const AddCategory = () => {
  const [state, setState] = useState(innititalState);
  const { name, desc } = state;

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
      push(ref(db, 'categories/'), state)
      .then(() => {
        toast.success("Thêm danh mục thành công")
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
