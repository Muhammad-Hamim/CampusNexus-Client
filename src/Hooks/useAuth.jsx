import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const useAuth = () => {
  const info = useContext(AuthContext);
  return info;
};

export default useAuth;
