import React, { useState } from "react";
import { loginAndFetchUserData } from "../../../services/users";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [account,setAccount] = useState();
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setAccount({...account,[name] : value})
  }
  const handleSubmit = (e) => {
    console.log(account)
    e.preventDefault();

   loginAndFetchUserData(account);
   
   
  };

  return (
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img className="img-fluid" src=" https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"alt="Ảnh" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    onChange={handleInputChange}
                  />
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="form1Example3"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <Link to="#!">Forgot password?</Link>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </section>
  );
};

export default Login;
