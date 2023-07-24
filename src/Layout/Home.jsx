import React from "react";
import Gallery from "../Pages/Home/Gallery";
import Colleges from "../Pages/Colleges/Colleges";
import Review from "../Pages/Home/Review";

const Home = () => {
  return (
    <div>
      <div>
        <div className="text-center mt-8">
          <h2 className="text-4xl font-bold">Featured Universities</h2>
          <p className="text-lg">
            Explore the Best Higher Education Institutions
          </p>
        </div>
        <Colleges limit="limit" />
      </div>
      <div>
        <Gallery />
      </div>
      <div>
        <Review />
      </div>
    </div>
  );
};

export default Home;
