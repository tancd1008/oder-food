import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImage } from "../services/uploadImage";

const UploadImage = () => {
  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const imgTail = ["png", "jpg", "jpeg", "svg", "gif"];
  const handleChange = (e) => {
    e?.preventDefault();
    console.log("e", e.target.files);
    setImage(e.target.files[0]);
  };
  const checkImage = (imageName) => {
    var check = false;
    for (let i = 0; i < imgTail.length; i++) {
      if (imageName.includes(imgTail[i])) {
        check = true;
        break;
      }
    }
    return check;
  };
  const handleUpload = () => {
    if (!image) {
      toast.error("Phải upload image");
    } else {
      var check = checkImage(image.name);
      if (!check) {
        toast.error(`File upload phải có đuôi là : ${imgTail.join(", ")} `);
      } else {
        try {
          uploadImage(image, setUrlImage);
          // setTimeout(() => {
          //   getImageUrl(image,setUrlImage);
          // }, 2000);
        } catch (error) {
          toast.error(error);
        }
      }
    }
  };
  return (
    <div>
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Cover photo
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  onChange={handleChange}
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleUpload}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={urlImage}
              alt="Two each of gray, white, and black shirts laying flat."
              className="rounded-[1rem] object-cover object-center"
            />
          </div>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default UploadImage;
