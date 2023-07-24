import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Store } from "react-notifications-component";
import useAuth from "./useAuth";

export const getUser = (email) => {
  const { loading } = useAuth();
  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseURL}/users?email=${email}`
      );
      return res.data;
    },
  });
  return { userData, isLoading, refetch };
};

export const registerUser = (user) => {
  axios.post(`${import.meta.env.VITE_BaseURL}/users`, user).then((response) => {
    console.log(response.data);
    if (response.data.acknowledged) {
      Store.addNotification({
        title: "Registration successful",
        message: "Verification email sent successfully",
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
  });
};

export const updateUserInfo = (email, userInfo) => {
  axios
    .patch(`${import.meta.env.VITE_BaseURL}/users?email=${email}`, userInfo)
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        Store.addNotification({
          title: "user info update successful",
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
