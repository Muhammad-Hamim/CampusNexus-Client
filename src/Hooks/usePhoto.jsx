import axios from "axios";

const imgHostingToken = import.meta.env.VITE_imgHostingToken;
const usePhoto = (photo) => {
  if (photo) {
    const imgHostingurl = `https://api.imgbb.com/1/upload?&key=${imgHostingToken}`;
    const formData = new FormData();
    formData.append("image", photo[0]);
    return axios.post(imgHostingurl, formData);
  }
};

export default usePhoto;
