import { collegeReview } from "../../Hooks/useColleges";


const Review = () => {
  const { reviews, isLoading } = collegeReview("review");
  console.log(reviews);
  return (
    <div className="max-w-screen-2xl px-2 md:px-4 lg:px-2 xl:px-4 2xl:px-0 mx-auto">
      <div className="my-6 text-center">
        <h2 className="text-4xl font-bold">Student Testimonials</h2>
        <p className="text-lg">Discover Stories of Success and Inspiration</p>
      </div>
      <div></div>
    </div>
  );
};

export default Review;
