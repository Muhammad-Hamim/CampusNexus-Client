import React from "react";
import { getMyColleges } from "../../Hooks/useMyCollege";
import useAuth from "../../Hooks/useAuth";
import Spinner from "../../Components/Spinner/Spinner";

const MyColleges = () => {
  const { user } = useAuth();
  const { myColleges, isLoading, refetch } = getMyColleges(user?.email);
  console.log(myColleges);

  if (isLoading) {
    return <Spinner />;
  }
  return <div></div>;
};

export default MyColleges;
