import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiEyeSlash, HiEye } from "react-icons/hi2";
import useAuth from "../../Hooks/useAuth";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import { sendEmailVerification } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerUser } from "../../Hooks/useUsers";
import usePhoto from "../../Hooks/usePhoto";

const Register = () => {
  const { createUser, updateUserProfile, logOut } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const location = useLocation();
  // const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    usePhoto(data.photo)
      .then((imgResponse) => {
        console.log(imgResponse);
        if (imgResponse.data.success) {
          const photoURL = imgResponse.data.data.display_url;
          createUser(data.email, data.password)
            .then((result) => {
              console.log(result.user);
              updateUserProfile(data.name, photoURL).then(() => {});
              const user = {
                name: data.name,
                email: data.email,
                photoURL,
              };
              registerUser(user);
            })
            .catch((error) => {
              console.log(error);
              setErrorMessage(error.message);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="">
        <label htmlFor="name" className="text-lg font-normal">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-2 rounded-md"
          type="text"
          placeholder="Your Name"
        />
        {errors.name?.type === "required" && (
          <p role="alert" className="text-red-400 mt-3">
            Name is required
          </p>
        )}
      </div>
      <div className="my-4">
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
        <label htmlFor="photo" className="text-lg font-normal">
          Photo
        </label>
        <input
          id="photo"
          {...register("photo", { required: true })}
          className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-2 rounded-md"
          type="file"
          placeholder="Your photo"
        />
        {errors.photo?.type === "required" && (
          <p role="alert" className="text-red-400 mt-3">
            Photo is required
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="text-lg font-normal">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            {...register("password", { required: true })}
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
        <div className="mt-4 space-x-2 flex items-center">
          <input
            id="conditions"
            type="checkbox"
            defaultChecked="checked"
            className="checkbox checkbox-warning"
          />
          <label htmlFor="conditions" className="cursor-pointer">
            <span className="label-text">
              I agree the{" "}
              <span className="hover:text-[#ED6620] cursor-pointer font-medium">
                Terms & conditions
              </span>
            </span>
          </label>
        </div>
      </div>
      <p className="mt-4 text-red-500">{errorMessage}</p>
      <div className="mt-10 pb-10">
        <button className="w-full block bg-[#ED6620] font-medium text-white border-[#ED6620] border-2 outline-none p-2 rounded-md">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
