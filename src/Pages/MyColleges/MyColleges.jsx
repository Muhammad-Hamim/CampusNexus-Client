import React from "react";
import { getMyColleges } from "../../Hooks/useMyCollege";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../../Components/Spinner/Spinner";
import {ImCross} from 'react-icons/im'

const MyColleges = () => {
  const { user } = useAuth();
  const { myColleges, isLoading, refetch } = getMyColleges(user?.email);
  console.log(myColleges);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="max-w-screen-2xl min-h-screen my-10 px-2 md:px-4 lg:px-2 xl:px-4 2xl:px-0 mx-auto">
      <div className="my-6 text-center">
        <h2 className="text-4xl font-bold">Your Academic Home</h2>
        <p className="text-lg">Your Gateway to Higher Education Excellence</p>
      </div>
      {myColleges.map((college, index) => {
        return (
          <div
            key={index}
            className="flex flex-col bg-[#F4F4F4] p-4 mt-6 rounded-md relative">
            <div className="flex-grow">
              {" "}
              <h2 className="text-2xl font-semibold">
                {college.universityName}
              </h2>
              <h3 className="text-lg mt-2">{college.subject}</h3>
            </div>
            <div className="flex justify-end items-end flex-wrap gap-6">
              <button className="absolute top-3 right-3 duration-300 text-red-600 text-2xl rounded-full">
                <ImCross />
              </button>
              <button className="px-6 py-2 bg-indigo-600 hover:bg-orange-600 duration-300 text-white rounded-md">
                Add review
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyColleges;
