import React, { useState } from "react";
import { useCollegeGallery } from "../../Hooks/useColleges";
import { TailSpin } from "react-loader-spinner";
import { NavLink } from "react-router-dom";

const Gallery = () => {
  const [isLimit, setIsLimit] = useState("limit");
  const { collegePhoto, isLoading, refetch } = useCollegeGallery(isLimit);

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
    <>
      <div className="mt-10 text-center">
        <h2 className="text-4xl font-bold">Welcome to Our Gallery</h2>
        <p className="text-lg">
          Explore the amazing collection of photos of our top universities
        </p>
      </div>
      <div className="max-w-screen-2xl px-2 md:px-4 lg:px-2 xl:px-4 2xl:px-0 mx-auto my-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collegePhoto.map((photo) => {
          const images = Object.values(photo);
          images.splice(0, 2);
          return images.map((image, index) => {
            return (
              <div
                key={index}
                className="galleryContainer relative overflow-hidden">
                <img
                  className="h-[300px] w-full object-center"
                  src={image}
                  alt=""
                />
                <NavLink to={`/college/${photo._id}`}>
                  <div className="w-full h-full galleryDetails duration-300 absolute top-full left-0 bg-black/10 backdrop-blur-sm flex flex-col place-content-center place-items-center">
                    <h2 className="text-slate-100 text-lg">{photo.name}</h2>
                    <button className="text-white text-xl">Details</button>
                  </div>
                </NavLink>
              </div>
            );
          });
        })}
      </div>
      {isLimit === "limit" ? (
        <div className="text-center py-4">
          <button
            onClick={() => {
              setIsLimit("nolimit");
              refetch();
            }}
            className="btn btn-success text-white">
            see more
          </button>
        </div>
      ) : (
        <div className="text-center py-4">
          <button
            onClick={() => {
              setIsLimit("limit");
              refetch();
            }}
            className="btn btn-error text-white">
            see less
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
