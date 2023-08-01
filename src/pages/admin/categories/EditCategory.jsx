import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDetailCategory } from "../../../services/category";
import { editCategory } from "../../../store/categoriesSlide";
const initialState = {
  name: "",
  desc: "",
  is_active: 0,
  restaurantId: "",
};
const EditCategory = () => {
  const [state, setState] = useState(initialState);
  const { name, desc } = state;
  const { restaurantId, categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !desc) {
      toast.error("Mời bạn nhập!");
    } else {
      try {
        dispatch(editCategory({categoryId, category:state, restaurantId}))
        toast.success("Successfully");
        setTimeout(() => {
          navigate("/admin/category/list");
        }, 3000);
      } catch (error) {
        toast.error("Lỗi");
      }
    }
  };
  useEffect(() => {
    const getCategory = async () => {
      const categoryDoc = await getDetailCategory(categoryId, restaurantId);
      setState(categoryDoc);
    };
    getCategory();
  }, [restaurantId, categoryId]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Cập nhật danh mục</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Tên danh mục
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Sản phẩm"
            value={state.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Nội dung
          </label>
          <input
            type="text"
            id="pdescrice"
            name="desc"
            className="form-control"
            placeholder="Nội dung..."
            value={state.desc}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default EditCategory;
