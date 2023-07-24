import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useColleges } from "../../Hooks/useColleges";
const Colleges = ({limit}) => {
  const { colleges, isLoading } = useColleges(limit);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[60vh]">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl px-2 md:px-4 lg:px-2 xl:px-4 2xl:px-0 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 my-10">
      {colleges.map((college) => {
        return (
          <div
            key={college._id}
            className="w-full bg-[#f8fafc] hover:shadow-md duration-500 shadow-slate-100 rounded-md overflow-hidden relative collegeCard flex flex-col">
            <div className="h-[200px] w-full overflow-hidden">
              <img
                className="h-full w-full collegeImg duration-300 object-cover object-center"
                src={college.image}
                alt=""
              />
              <div className="absolute -top-full duration-300 right-3 CollegeRating">
                <button className=" text-white bg-black/30 shadow-md backdrop-blur-sm p-2 rounded-full">
                  <FaRegHeart className="text-2xl" />
                </button>
                <h3 className="text-xl mt-3 text-white bg-black/30 shadow-md backdrop-blur-sm p-2 rounded-full">
                  {college.rating}
                </h3>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <h2 className="text-lg font-medium">{college.name}</h2>
              <p>Admission Date: {college.admissionDates}</p>
              <p>Research done: {college.researchPapers.length}</p>
            </div>
            <div className="px-4 mb-4 flex justify-end items-end">
              <Link to={`/college/${college._id}`}>
                <button className="px-6 py-3 bg-indigo-500 text-sm text-white font-semibold rounded-md hover:bg-orange-500 duration-300">
                  Details
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Colleges;
