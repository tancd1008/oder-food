import { getDatabase, onValue, ref } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
const innititalState = {
  id: "",
  name: "",
  price: "",
  desc: "",
  imgSrc: "",
  categoryId: [],
  is_active: 0,
};
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const AddProduct = () => {
  const [state, setState] = useState(innititalState);
  const [categories, setCategories] = useState([]);

  const { name, price, desc, imgSrc } = state;
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    const getCategory = async () => {
      const db = getDatabase();
      const productRef = ref(db, "categories/");
      onValue(productRef, (snapshot) => {
        var newData = [];
        snapshot.forEach((item) => {
          newData.push(item.val());
        });
        setCategories(newData);
      });
    };
    getCategory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!e.target.files) {
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, imgSrc: e.target.files[0] });
    }
  };
  const handleSelectChange = (selectedOptions) => {
    console.log(selectedOptions)
    setState({...state, categoryId: selectedOptions})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductData = { ...state };
    console.log(newProductData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Thêm mới món ăn</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Sản phẩm...."
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Danh mục
          </label>
          {/* <select
            id="selectOption"
            className="form-control"
            name="categoryId"
            onChange={handleInputChange}
          >
            {categories.map((category, index) => (
              <option value={category.id} key={index}>
                {category.name}
              </option>
            ))}
          </select> */}
          <Select
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Giá tiền
          </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="00000$"
            className="form-control"
            value={price}
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
            placeholder="Nội dung...."
            className="form-control"
            value={desc}
            onChange={handleInputChange}
          />
        </div>
        <div className=" mb-3">
          <label htmlFor="dropzone-file" className="form-label">
            <input
              id="dropzone-file"
              name="imgSrc"
              type="file"
              className="form-control"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm mới
        </button>
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          {/* <img
            src={urlImage}
            alt="Two each of gray, white, and black shirts laying flat."
            className="rounded-[1rem] object-cover object-center"
          /> */}
        </div>
        <ToastContainer position="top-center" />
      </form>
    </div>
  );
};

export default AddProduct;
