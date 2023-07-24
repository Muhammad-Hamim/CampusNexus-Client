import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useColleges = () => {
  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ["Colleges"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BaseURL}/colleges`);
      return res.data;
    },
  });
  return { colleges, isLoading };
};

export const useCollegeGallery = (limit) => {
  const {
    data: collegePhoto = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["collegePhoto", limit], // Make the queryKey dynamic by including 'limit'
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseURL}/colleges?image=${limit}`
      );
      return res.data;
    },
  });
  return { collegePhoto, isLoading, refetch };
};

export const useSingleCollege = (id) => {
  const {
    data: singleCollege = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleCollege", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseURL}/colleges/${id}`
        );
        return res.data;
      },
  });
  return { singleCollege, isLoading, refetch };
};
