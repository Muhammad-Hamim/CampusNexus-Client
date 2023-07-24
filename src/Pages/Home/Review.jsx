import { useState } from "react";
import { collegeReview } from "../../Hooks/useColleges";
import Spinner from "../../Components/Spinner/Spinner";
import { Rating } from "@smastrom/react-rating";

const Review = () => {
  const [isLimit, setIsLimit] = useState("reviewlimit");
  const { reviews, isLoading } = collegeReview(isLimit);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="max-w-screen-2xl px-2 md:px-4 lg:px-2 xl:px-4 2xl:px-0 mx-auto">
      <div className="my-6 text-center">
        <h2 className="text-4xl font-bold">Student Testimonials</h2>
        <p className="text-lg">Discover Stories of Success and Inspiration</p>
      </div>
      <div className=" flex flex-wrap">
        {reviews.map((review) => {
          return review.reviews.map((reviewRating, index) => {
            console.log(reviewRating);
            return (
              <div
                key={index}
                className={`w-full lg:w-[45%] mt-5 p-4 ${
                  index % 2 === 0
                    ? "ml-auto text-right rounded-tl-full"
                    : "mr-auto text-left rounded-tr-full"
                } bg-indigo-50`}>
                <h4 className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                  <Rating
                    style={{ width: 60 }}
                    readOnly
                    value={reviewRating?.rating}
                  />
                </h4>
                <h2 className="text-lg font-medium">{review.name}</h2>
                <h3 className="italic">
                  {reviewRating.name ? reviewRating.name : "Anonymous"}
                </h3>
                <h2>{reviewRating.comment}</h2>
              </div>
            );
          });
        })}
      </div>
      <div className="text-center mt-4">
        {isLimit === "reviewlimit" ? (
          <div className="text-center py-4">
            <button
              onClick={() => {
                setIsLimit("review");
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
                setIsLimit("reviewlimit");
                refetch();
              }}
              className="btn btn-error text-white">
              see less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
