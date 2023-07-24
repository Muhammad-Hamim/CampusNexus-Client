import React from "react";
import { useCollegeGallery } from "../../Hooks/useColleges";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Admission = () => {
  const { collegePhoto, isLoading, refetch } = useCollegeGallery("admission");
  console.log(collegePhoto);

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
    <div className="max-w-screen-2xl px-2 md:px-4 lg:px-2 xl:px-4 2xl:px-0 mx-auto  my-10">
      <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-5">
        {collegePhoto.map((item, index) => {
          return (
            <div
              className="bg-[#f8fafc] rounded-md hover:shadow-md shadow-slate-300 duration-300 p-4 flex flex-col"
              key={index}>
              <div className="flex-grow">
                <h2 className="text-2xl font-serif">{item.name}</h2>
                <p className="italic">{item.admissionDates}</p>
              </div>
              <div className="mt-3 flex items-end gap-4">
                <Link to={`/admission/${item._id}`}>
                  <button className="link link-primary link-hover">
                    Admission
                  </button>
                </Link>
                <Link to={`/college/${item._id}`}>
                  <button className="link link-info link-hover">Details</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admission;
