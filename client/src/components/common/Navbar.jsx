/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
  FaBars,
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.authReducer.role);
  const token = useSelector((state) => state.authReducer.token);

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
              <img
                src="/logo.jfif"
                alt=""
                className="w-12 md:w-16 h-auto rounded-full"
              />
            </Link>
            <div className="hidden md:flex gap-x-4 items-center">
              {token ? (
                <>
                  {role === "trainer" && (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                      >
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/programs"
                        className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                      >
                        <FaClipboardList />
                        <span>البرامج</span>
                      </Link>
                      <Link
                        to="/plans"
                        className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                      >
                        <FaFileInvoiceDollar />
                        <span>الخطط</span>
                      </Link>
                    </>
                  )}
                  {role === "trainee" && (
                    <>
                      <Link
                        to="/profile"
                        className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                      >
                        <FaUser />
                        <span>الملف الشخصي</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                      >
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-x-2 transition duration-300"
                  >
                    <FaSignOutAlt />
                    <span>تسجيل خروج</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                  >
                    <FaSignInAlt />
                    <span>تسجيل الدخول</span>
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                  >
                    <FaUserPlus />
                    <span>التسجيل</span>
                  </Link>
                </>
              )}
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
              <div className="gap-y-1 px-2 pt-2 pb-3">
                {token ? (
                  <>
                    {role === "trainer" && (
                      <>
                        <Link
                          to="/dashboard"
                          className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                        >
                          <FaTachometerAlt />
                          لوحة القيادة
                        </Link>
                        <Link
                          to="/programs"
                          className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                        >
                          <FaClipboardList />
                          البرامج
                        </Link>
                        <Link
                          to="/plans"
                          className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                        >
                          <FaFileInvoiceDollar />
                          الخطط
                        </Link>
                      </>
                    )}
                    {role === "trainee" && (
                      <>
                        <Link
                          to="/profile"
                          className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                        >
                          <FaUser />
                          الملف الشخصي
                        </Link>
                        <Link
                          to="/dashboard"
                          className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                        >
                          <FaTachometerAlt />
                          لوحة القيادة
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center w-full transition duration-300"
                    >
                      <FaSignOutAlt />
                      تسجيل خروج
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                    >
                      <FaSignInAlt />
                      تسجيل الدخول
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2 items-center"
                    >
                      <FaUserPlus />
                      التسجيل
                    </Link>
                  </>
                )}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
