import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Store } from "react-notifications-component";
import useAuth from "./useAuth";

export const getMyColleges = (email) => {
  const { loading } = useAuth();
  const {
    data: myColleges = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mycolleges", email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseURL}/mycolleges?email=${email}`
      );
      return res.data;
    },
  });
  return { myColleges, isLoading, refetch };
};

export const AdmissionData = (studentInfo) => {
  axios
    .post(`${import.meta.env.VITE_BaseURL}/mycolleges`, studentInfo)
    .then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Store.addNotification({
          title: "Admission successful",
          type: "success",
          insert: "top",
          isMobile: true,
          showIcon: true,
          container: "top-center",
          animationIn: ["animate__animated", "animate__bounceIn"],
          animationOut: ["animate__animated", "animate__zoomOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
