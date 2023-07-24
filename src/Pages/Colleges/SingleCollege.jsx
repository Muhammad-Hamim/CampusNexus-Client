import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSingleCollege } from "../../Hooks/useColleges";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../../Components/Spinner/Spinner";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const SingleCollege = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const { singleCollege, isLoading, refetch } = useSingleCollege(id);
  console.log(singleCollege);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="max-w-screen-2xl px-2 md:px-4 lg:px-2 xl:px-4 2xl:px-0 mx-auto ">
      <div className="grid md:grid-cols-2 gap-10 my-10">
        <div>
          <Carousel
            showIndicators={true}
            swipeable={true}
            useKeyboardArrows={true}
            infiniteLoop={true}
            showStatus={false}
            autoPlay>
            <div>
              <img
                className="hover:scale-125 duration-200"
                src={singleCollege?.image}
              />
            </div>
            {singleCollege.collegeGallery.map((image, index) => {
              return (
                <div key={index}>
                  <img src={image} />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {singleCollege.name}
          </h2>
          <h3 className="text-lg italic">
            Admission Deadline: {singleCollege.admissionDates}
          </h3>
          <h4>
            <Rating
              style={{ width: 150 }}
              readOnly
              value={singleCollege.rating}
            />
          </h4>
          <p className="mt-4 text-lg font-medium">
            Details: <span>{singleCollege.details}</span>
          </p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Additional Information</h2>
            <h2 className="text-lg font-medium">Research History:</h2>
            <p>{singleCollege.researchHistory}</p>
            <h2 className="text-lg font-medium">Events:</h2>
            {singleCollege.events.map((event, index) => {
              return (
                <li key={index} className="ml-4">
                  {event}
                </li>
              );
            })}
            <h2 className="text-lg font-medium">Sports:</h2>
            {singleCollege.sports.map((sport, index) => {
              return (
                <li key={index} className="ml-4">
                  {sport}
                </li>
              );
            })}
          </div>
          <div className="mt-10">
            <Link to={`/admission/${singleCollege._id}`}>
              <button className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-orange-500 duration-300">
                Admission
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="my-6">
          <h2 className="text-xl font-medium">Research Paper</h2>
          {singleCollege.researchPapers.map((paper, index) => {
            return (
              <div key={index} className="mt-2">
                <h2 className="text-lg font-normal">Title :{paper.title}</h2>
                <p className="italic">Author: {paper.author}</p>
                <Link to={paper.link}>
                  <button className="link-primary link-hover">
                    see papers
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <h2 className="text-xl font-medium">Reviews</h2>
          {singleCollege.reviews.map((review, index) => {
            return (
              <div key={index} className="my-4">
                <h4>
                  <Rating
                    style={{ width: 100 }}
                    readOnly
                    value={review?.rating}
                  />
                </h4>
                <h2 className="italic text-lg">
                  {review?.author ? review?.author : "Anonymous"}
                </h2>
                <h2>{review?.comment}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleCollege;
