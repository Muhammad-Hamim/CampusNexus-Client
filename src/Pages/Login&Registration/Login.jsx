import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiEyeSlash, HiEye } from "react-icons/hi2";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { login, setLoginPage } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        Store.addNotification({
          message: "Login successful",
          type: "success",
          insert: "top",
          isMobile: true,
          showIcon: true,
          container: "top-center",
          animationIn: ["animate__animated", "animate__bounceIn"],
          animationOut: ["animate__animated", "animate__zoomOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="">
        <label htmlFor="email" className="text-lg font-normal">
          Email
        </label>
        <input
          id="email"
          {...register("email", { required: true })}
          className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-2 rounded-md"
          type="email"
          placeholder="Your Email"
        />
        {errors.email?.type === "required" && (
          <p role="alert" className="text-red-400 mt-3">
            Email is required
          </p>
        )}
      </div>
      <div className="my-4">
        <label htmlFor="password" className="text-lg font-normal">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password", { required: true })}
            id="password"
            className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-2 rounded-md"
            type={showPass ? "text" : "password"}
            placeholder="Your Password"
          />
          <label className="text-2xl absolute top-1/2 -translate-y-1/2  right-4 cursor-pointer">
            {showPass ? (
              <HiEye
                onClick={() => {
                  setShowPass(!showPass);
                }}
              />
            ) : (
              <HiEyeSlash
                onClick={() => {
                  setShowPass(!showPass);
                }}
              />
            )}
          </label>
        </div>
        {errors.password?.type === "required" && (
          <p role="alert" className="text-red-400 mt-3">
            Password is required
          </p>
        )}
        <div className="mt-1">
          <p
            onClick={() => setLoginPage("forgotPassword")}
            className="hover:underline">
            Forgot password?
          </p>
        </div>
      </div>
      <p className="mt-4 text-red-500">{errorMessage}</p>
      <div className="mt-10 pb-10">
        <button className="w-full block bg-[#ED6620] font-medium text-white border-[#ED6620] border-2 outline-none p-2 rounded-md">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
