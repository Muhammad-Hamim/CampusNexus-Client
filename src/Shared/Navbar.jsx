import logo from "../assets/Navbar/logo.png";
import { FaRegHeart, FaSearch, FaUserAlt } from "react-icons/fa";
import { FiShoppingCart, FiFacebook } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import BurgerMenu from "../Components/BurgerMenu/BurgerMenu";
import Hamburger from "hamburger-react";
import useAuth from "../Hooks/useAuth";
import SearchBox from "../Components/SearchBox/SearchBox";
import { AiFillHome, AiOutlineBulb, AiOutlineUser } from "react-icons/ai";
import { MdDashboard, MdCodeOff } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { LuGithub, LuLinkedin } from "react-icons/lu";
const Navbar = () => {
  const { isOpen, setIsOpen, user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("logout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navItem = [
    {
      name: "Home",
      path: "/",
      icon: <AiFillHome />,
    },
    {
      name: "Colleges",
      path: "/colleges",
      icon: <AiOutlineBulb />,
    },
    {
      name: "Admission",
      path: "/admission",
      icon: <MdCodeOff />,
    },
    {
      name: "My colleges",
      path: "/mycolleges",
      icon: <MdDashboard />,
    },
  ];
  return (
    <>
      <div className="bg-[#F4F4F4] py-6 border-b-2">
        <div className="lg:max-w-screen-2xl px-8 2xl:px-0 mx-auto flex items-center justify-between">
          <div>
            <Link to="/">
              <img className="h-12 w-fit" src={logo} alt="" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex w-full flex-wrap items-stretch">
              {navItem.map((item, index) => {
                return (
                  <NavLink
                    to={item.path}
                    key={index}
                    className={({ isActive }) =>
                      isActive ? "text-orange-500" : ""
                    }>
                    <li className="cursor-pointer hover:text-orange-500 duration-200 font-medium list-none mx-2">
                      {item.name}
                    </li>
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="space-x-8 hidden lg:flex items-center">
            <button className="text-xl">
              <FaRegHeart />
            </button>
            <button className="text-xl">
              <FiShoppingCart />
            </button>
            {!user ? (
              <Link to="/login">
                <button className="px-6 py-3 bg-[#ED6620] text-white rounded-md">
                  {" "}
                  Login
                </button>
              </Link>
            ) : (
              <div className="dropdown dropdown-end z-20">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  {user.photoURL ? (
                    <div className="w-10 rounded-full ring-2 ring-offset-2 ring-orange-500">
                      <img src={user.photoURL && user.photoURL} />
                    </div>
                  ) : (
                    <FaUserAlt className="text-4xl p-2 rounded-full ring-2 ring-offset-2 ring-orange-500" />
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link to="/profile">
                      <button className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="dashboard">Dashboard</Link>
                  </li>
                  <li onClick={handleLogOut}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* mobile navigation bar */}
          <div className="block lg:hidden">
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
            <div
              className={`fixed top-0 left-0 z-50 w-[65%] md:w-[35%] lg:w-[15%] ${
                isOpen
                  ? "translate-x-0 origin-right duration-500"
                  : "-translate-x-[101%] lg:translate-x-0 origin-right duration-500"
              }`}>
              <BurgerMenu />
            </div>
          </div>
        </div>
      </div>
      {/* <Header/> */}
      {/* <SearchBox /> */}
    </>
  );
};

export default Navbar;
