import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { getUser, updateUserInfo } from "../../Hooks/useUsers";
import { useCollegeGallery } from "../../Hooks/useColleges";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { AdmissionData } from "../../Hooks/useMyCollege";

const AdmissionForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { userData } = getUser(user?.email);
  const { collegePhoto, isLoading, refetch } = useCollegeGallery("admission");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const information = {
      ...userData,
      universityName: data.university,
      subject: data.subject,
    };
    delete information?._id;
    console.log(information);
    AdmissionData(information);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="max-w-screen-2xl px-2 md:px-4 lg:px-2 xl:px-4 2xl:px-0 mx-auto bg-[#f8fafc] my-10">
      <div className="border-b-2 px-4 py-4 pb-5 bg-orange-500  flex items-center gap-6 border-white">
        <h2 className="text-xl font-medium text-white">
          Please fill up the form
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 p-5">
        <div className="mb-5">
          <label htmlFor="picture" className="text-lg font-normal">
            Profile Picture
          </label>
          <div className="flex flex-col-reverse md:flex-row md:justify-between items-center mt-4 gap-2 md:gap-10">
            <input
              id="picture"
              type="file"
              {...register("photo")}
              disabled
              className="file-input file-input-bordered w-full max-w-lg"
            />{" "}
            <img
              src={user?.photoURL} // Provide the URL to your default profile picture
              alt="Profile Picture"
              className="w-20 h-20 block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div className="mb-5">
          <h2 className="text-lg font-normal">University Name</h2>
          <div>
            <select
              {...register("university")}
              className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md ">
              {collegePhoto.map((college, index) => {
                return (
                  <option key={index} selected={college._id === id}>
                    {college.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mb-5">
          <h2 className="text-lg font-normal">Subject</h2>
          <div>
            <select
              {...register("subject")}
              className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md ">
              {collegePhoto.map((college) => {
                return (
                  college._id === id &&
                  college.subjects.map((subject, index) => {
                    return <option key={index}>{subject}</option>;
                  })
                );
              })}
            </select>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="text-lg font-normal">
            Name
          </label>
          <input
            id="name"
            className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md"
            type="text"
            {...register("name")}
            readOnly
            defaultValue={user?.displayName}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-lg font-normal">
            Email Address
          </label>
          <input
            id="email"
            className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md"
            defaultValue={user?.email}
            type="email"
            readOnly
          />
        </div>
        <div className="mb-5">
          <label htmlFor="number" className="text-lg font-normal">
            Mobile Number
          </label>
          <input
            id="number"
            readOnly
            defaultValue={userData?.phone}
            className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md"
            {...register("mobileNumber")}
            type="number"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="dob" className="text-lg font-normal">
            Date of year
          </label>
          <input
            id="dob"
            readOnly
            defaultValue={userData?.dob}
            className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md"
            {...register("dob")}
            type="date"
          />
        </div>
        <div className="mb-5">
          <h2 className="text-lg font-normal">Gender</h2>
          <div>
            <select
              disabled
              defaultValue={userData?.gender}
              {...register("gender")}
              className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md ">
              <option selected={userData?.gender === "Male"}>Male</option>
              <option selected={userData?.gender === "Female"}>Female</option>
              <option selected={userData?.gender === "Others"}>Others</option>
            </select>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="text-lg font-normal">
            Address
          </label>
          <textarea
            id="address"
            readOnly
            defaultValue={userData?.address}
            {...register("address")}
            className="mt-2 w-full block h-32 resize-none focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md"
            placeholder="#House: 33, #Road: 7, #Block: 3, Village: Abc, #"></textarea>
        </div>
        <div className="block mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-500 text-sm text-white font-semibold rounded-md hover:bg-orange-500 duration-300">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
