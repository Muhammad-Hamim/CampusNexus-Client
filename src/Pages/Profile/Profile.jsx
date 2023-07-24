import { useRef, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import usePhoto from "../../Hooks/usePhoto";
import { getUser, updateUserInfo } from "../../Hooks/useUsers";
import Spinner from "../../Components/Spinner/Spinner";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { userData, isLoading, refetch } = getUser(user.email);
  const [change, setChange] = useState(false);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // const photourl = URL.createObjectURL(data.photo[0]);
    if (data.photo) {
      usePhoto(data.photo).then((imgResponse) => {
        if (imgResponse.data.success) {
          const imageURL = imgResponse.data.data.display_url;
          setPhotoURL(imageURL);
        }
      });
    }
    updateUserProfile(data.name, photoURL)
      .then(() => {
        const userInfo = {
          name: data?.name ? data?.name : userData?.name,
          photoURL: photoURL ? photoURL : user?.photoURL,
          phone: data.mobileNumber ? data.mobileNumber : userData?.phone,
          gender: data.gender ? data?.gender : userData?.gender,
          dob: data.dob ? data?.dob : userData?.dob,
          address: data.address ? data?.address : userData?.address,
        };
        console.log(userInfo);
        updateUserInfo(user?.email, userInfo);
      })
      .catch((error) => {
        console.log(error);
      });

    // setUploadedPhoto(photourl);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="max-w-screen-2xl px-2 md:px-4 lg:px-2 xl:px-4 2xl:px-0 mx-auto bg-[#f8fafc] my-10">
      <div className="border-b-2 px-4 py-4 pb-5 bg-orange-500  flex items-center gap-6 border-white">
        <h2 className="text-xl font-medium text-white">Personal Information</h2>
        <button onClick={() => setChange(!change)} className="link link-hover">
          Change information
        </button>
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
              className="file-input file-input-bordered w-full max-w-lg"
              disabled={!change}
            />{" "}
            <img
              src={user?.photoURL} // Provide the URL to your default profile picture
              alt="Profile Picture"
              className="w-20 h-20 block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none rounded-full cursor-pointer"
            />
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
            defaultValue={user?.displayName}
            readOnly={!change}
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
            className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md"
            defaultValue={userData?.phone}
            {...register("mobileNumber")}
            type="number"
            readOnly={!change}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="dob" className="text-lg font-normal">
            Date of year
          </label>
          <input
            id="dob"
            className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md"
            defaultValue={userData?.dob}
            {...register("dob")}
            type="date"
            readOnly={!change}
          />
        </div>
        <div className="mb-5">
          <h2 className="text-lg font-normal">Gender</h2>
          <div>
            <select
              {...register("gender")}
              disabled={!change}
              className="mt-2 w-full block focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md ">
              <option selected={userData?.gender == "Male"}>Male</option>
              <option selected={userData?.gender == "Female"}>Female</option>
              <option selected={userData?.gender == "Others"}>Others</option>
            </select>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="text-lg font-normal">
            Address
          </label>
          <textarea
            id="address"
            {...register("address")}
            defaultValue={userData?.address}
            className="mt-2 w-full block h-32 resize-none focus:border-[#ED6620] border-slate-400 border-[1px] outline-none p-3 rounded-md"
            placeholder="#House: 33, #Road: 7, #Block: 3, Village: Abc, #"
            readOnly={!change}></textarea>
        </div>
        <div className={change ? "block mt-6" : "hidden"}>
          <button
            type="submit"
            onClick={() => setChange(false)}
            className="btn btn-success">
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
