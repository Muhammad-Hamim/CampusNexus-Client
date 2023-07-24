import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Layout/Home";
import SignIn from "../Pages/Login&Registration/SignIn";
import Colleges from "../Pages/Colleges/Colleges";
import SingleCollege from "../Pages/Colleges/SingleCollege";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Profile/Profile";
import Admission from "../Pages/Admission/Admission";
import AdmissionForm from "../Pages/Admission/AdmissionForm";
import MyColleges from "../Pages/MyColleges/MyColleges";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/colleges",
        element: <Colleges />,
      },
      {
        path: "/college/:id",
        element: (
          <PrivateRoute>
            <SingleCollege />
          </PrivateRoute>
        ),
      },
      {
        path: "/admission",
        element: <Admission />,
      },
      {
        path: "/admission/:id",
        element: <AdmissionForm />,
      },
      {
        path: "/mycolleges",
        element: <MyColleges />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
