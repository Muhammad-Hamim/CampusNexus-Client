import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  const navItem = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Colleges",
      path: "/colleges",
    },
    {
      name: "Admission",
      path: "/admission",
    },
    {
      name: "My colleges",
      path: "/mycolleges",
    },
  ];
  return (
    <div className="bg-[#F4F4F4] py-6">
      <div>
        <div className="flex justify-center flex-wrap">
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
        <div>
          <ul className="flex justify-center mt-6 gap-6 list-none">
            <li className="text-2xl hover:text-orange-500 cursor-pointer duration-200">
              <FiFacebook />
            </li>
            <li className="text-2xl hover:text-orange-500 cursor-pointer duration-200">
              <LuGithub />
            </li>
            <li className="text-2xl hover:text-orange-500 cursor-pointer duration-200">
              <LuLinkedin />
            </li>
            <li className="text-2xl hover:text-orange-500 cursor-pointer duration-200">
              <FaInstagram />
            </li>
            <li className="text-2xl hover:text-orange-500 cursor-pointer duration-200">
              <FaTwitter />
            </li>
            <li></li>
          </ul>
        </div>
      </div>
      <h2 className="text-center py-4">
        &copy; 2023{" "}
        <Link to="/" className="hover:text-orange-500 font-semibold">
          Campus Nexus
        </Link>
        . All Rights Reserved
      </h2>
    </div>
  );
};

export default Footer;
