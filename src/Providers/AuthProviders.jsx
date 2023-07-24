import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProviders = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginPage, setLoginPage] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const updateEmailAddress = (email) => {
    return updateEmail(auth.currentUser, email);
  };
  const passwordResetMail = (email) => {
    return sendPasswordResetEmail(auth, email, {
      url: `${import.meta.env.VITE_URL}/login`,
    });
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);
  const info = {
    isOpen,
    loading,
    user,
    loginPage,
    setLoginPage,
    setIsOpen,
    createUser,
    login,
    updateUserProfile,
    updateEmailAddress,
    passwordResetMail,
    logOut,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProviders;
