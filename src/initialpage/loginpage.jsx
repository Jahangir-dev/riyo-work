/**
 * Signin Firebase
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { alphaNumericPattern, emailrgx } from "../constant";
import { useDispatch } from "react-redux";
// ** Reactstrap Imports
import { Spinner } from 'reactstrap'
// ** Actions
import { handleLogin } from "../redux/authentication";

import jwt from "../auth/useJwt";

console.log(handleLogin);

const schema = yup.object({
  email: yup
    .string()
    .matches(emailrgx, "Email is required")
    .required("Email is required")
    .trim(),
  password: yup.string().max(10).required("Password is required").trim(),
});

const Loginpage = (props) => {
  const [eye, seteye] = useState(true);
  const [emailerror, setEmailError] = useState("");
  const [nameerror, setNameError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [formgroup, setFormGroup] = useState("");
  const [inputValues, setInputValues] = useState({
    email: "admin@admin.com",
    password: "admin123",
  });
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("data", data);

    // if (data.password != "123456") {
    //   setError("password", {
    //     message: "password is mismatch",
    //   });
    // } else {
    //   clearErrors("password");
    //   props.history.push("/app/main/dashboard");
    // }

     setIsLoading(true)
    jwt
      .login({ email: data.email, password: data.password })
      .then((res) => {
        console.log(res);
        setIsLoading(false)
         const data = { ...res.data.userData, accessToken: res.data.token, refreshToken: res.data.token }
        dispatch(handleLogin(data));
        clearErrors("general");
        history.push("/app/main/dashboard");
        // toast.success(
        //  s <ToastContent name={data.fullName || data.username || 'John Doe'} role={data.role || 'admin'} />,
        //   { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        // )
      })
      .catch((err) =>{ console.log(err);
        setIsLoading(false)
        setError("general", {
             message: err.response.data.message,
           });
          });
  };

  const onEyeClick = () => {
    seteye(!eye);
  };
  return (
    <>
      <Helmet>
        <title>Login - Riyo Work</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="account-content">
        {/* <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</Link> */}
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <Link to="/app/main/dashboard">
              <img src={Applogo} alt="Dreamguy's Technologies" />
            </Link>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              {/* Account Form */}
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          className={`form-control  ${
                            errors?.email ? "error-input" : ""
                          }`}
                          type="text"
                          value={value}
                          onChange={onChange}
                          autoComplete="false"
                        />
                      )}
                      defaultValue="admin@admin.com"
                    />
                    <small>{errors?.email?.message}</small>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div className="col-auto">
                        <Link className="text-muted" to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="pass-group">
                          <input
                            type={eye ? "password" : "text"}
                            className={`form-control  ${
                              errors?.password ? "error-input" : ""
                            }`}
                            value={value}
                            onChange={onChange}
                            autoComplete="false"
                          />
                          <span
                            onClick={onEyeClick}
                            className={`fa toggle-password" ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            }`}
                          />
                        </div>
                      )}
                      defaultValue="admin123"
                    />
                    <small>{errors?.password?.message}</small>
                    <small>{errors?.general?.message}</small>
                  </div>
                  
                  <div className="form-group text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit"
                    >
                      {isLoading ? (
                    <div>
                      <Spinner color='white' size='sm' />
                      <span className='ms-50'> Loading...</span>
                      </div>
                      ) : 'Login'
                      }
                    </button>
                  </div>
                </form>
                <div className="account-footer">
                  {/* <p>Don't have an account yet? <Link to="/register">Register</Link></p> */}
                </div>
              </div>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
