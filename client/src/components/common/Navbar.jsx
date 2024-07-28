/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
  FaBars,
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaClipboardList,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.authReducer.role);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gray-800 p-4 shadow-md fixed top-0 left-0 w-screen z-50 transition duration-300"
    >
      {({ open }) => (
        <>
          <div className="container mx-auto flex justify-between items-center">
            <Link
              to="/"
              className="text-white text-lg font-semibold flex items-center"
            >
              <FaHome className="mr-1" />
              My App
            </Link>
            <div className="hidden md:flex space-x-4 items-center">
              {role === "trainer" && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-white flex items-center hover:text-gray-300 transition duration-300"
                  >
                    <FaTachometerAlt className="mr-1" />
                    Dashboard
                  </Link>
                  <Link
                    to="/programs"
                    className="text-white flex items-center hover:text-gray-300 transition duration-300"
                  >
                    <FaClipboardList className="mr-1" />
                    Programs
                  </Link>
                  <Link
                    to="/plans"
                    className="text-white flex items-center hover:text-gray-300 transition duration-300"
                  >
                    <FaFileInvoiceDollar className="mr-1" />
                    Plans
                  </Link>
                </>
              )}
              {role === "trainee" && (
                <>
                  <Link
                    to="/profile"
                    className="text-white flex items-center hover:text-gray-300 transition duration-300"
                  >
                    <FaUser className="mr-1" />
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-white flex items-center hover:text-gray-300 transition duration-300"
                  >
                    <FaTachometerAlt className="mr-1" />
                    Dashboard
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
              >
                <FaSignOutAlt className="mr-1" />
                Logout
              </button>
            </div>
            <Disclosure.Button className="md:hidden flex items-center text-white hover:text-gray-300 transition duration-300">
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {role === "trainer" && (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-white flex items-center hover:text-gray-300 transition duration-300"
                    >
                      <FaTachometerAlt className="mr-1" />
                      Dashboard
                    </Link>
                    <Link
                      to="/programs"
                      className="text-white flex items-center hover:text-gray-300 transition duration-300"
                    >
                      <FaClipboardList className="mr-1" />
                      Programs
                    </Link>
                    <Link
                      to="/plans"
                      className="text-white flex items-center hover:text-gray-300 transition duration-300"
                    >
                      <FaFileInvoiceDollar className="mr-1" />
                      Plans
                    </Link>
                  </>
                )}
                {role === "trainee" && (
                  <>
                    <Link
                      to="/profile"
                      className="text-white flex items-center hover:text-gray-300 transition duration-300"
                    >
                      <FaUser className="mr-1" />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="text-white flex items-center hover:text-gray-300 transition duration-300"
                    >
                      <FaTachometerAlt className="mr-1" />
                      Dashboard
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center w-full transition duration-300"
                >
                  <FaSignOutAlt className="mr-1" />
                  Logout
                </button>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
