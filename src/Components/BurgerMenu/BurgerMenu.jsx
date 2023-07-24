import { AiFillHome, AiOutlineBulb, AiOutlineUser } from "react-icons/ai";
import { MdDashboard, MdCodeOff } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { FiFacebook } from "react-icons/fi";
import { LuGithub, LuLinkedin } from "react-icons/lu";

import Hamburger from "hamburger-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Navbar/logo.png";
import useAuth from "../../Hooks/useAuth";
const BurgerMenu = () => {
  const { isOpen, setIsOpen } = useAuth();
  console.log(isOpen);
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
    <div
      className={`w-full overflow-y-scroll navbar-scrollbar px-3 py-5 h-screen bg-[#F4F4F4]`}>
      <h2 className="text-slate-800 text-4xl flex justify-end lg:hidden">
        <Hamburger toggled={isOpen} toggle={() => setIsOpen(false)} />
      </h2>
      <div className="mt-16 flex justify-center">
        <Link to="/">
          <img className=" w-56 cursor-pointer" src={logo} alt="" />
        </Link>
      </div>
      <div className="py-10 mt-8 mx-5 flex flex-col">
        {navItem.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-slate-800"
              }>
              <li className="cursor-pointer flex items-center gap-2 text-lg font-medium py-2">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </li>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BurgerMenu;
