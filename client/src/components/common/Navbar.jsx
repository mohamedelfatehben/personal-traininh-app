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
      className="bg-gray-900 p-4 shadow-lg fixed top-0 left-0 w-full z-50"
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
                alt="Logo"
                className="w-12 md:w-16 h-auto rounded-full"
              />
            </Link>
            <div className="hidden md:flex gap-x-4 items-center">
              {token ? (
                <>
                  {role === "trainer" && (
                    <>
                      <NavLink
                        to="/dashboard"
                        icon={<FaTachometerAlt />}
                        label="Dashboard"
                      />
                      <NavLink
                        to="/programs"
                        icon={<FaClipboardList />}
                        label="البرامج"
                      />
                      <NavLink
                        to="/plans"
                        icon={<FaFileInvoiceDollar />}
                        label="الخطط"
                      />
                    </>
                  )}
                  {role === "trainee" && (
                    <>
                      <NavLink
                        to="/profile"
                        icon={<FaUser />}
                        label="الملف الشخصي"
                      />
                      <NavLink
                        to="/dashboard"
                        icon={<FaTachometerAlt />}
                        label="Dashboard"
                      />
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center gap-x-2 transition duration-300"
                  >
                    <FaSignOutAlt />
                    <span>تسجيل خروج</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    icon={<FaSignInAlt />}
                    label="تسجيل الدخول"
                  />
                  <NavLink
                    to="/sign-up"
                    icon={<FaUserPlus />}
                    label="التسجيل"
                  />
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
                        <MobileNavLink
                          to="/dashboard"
                          icon={<FaTachometerAlt />}
                          label="لوحة القيادة"
                        />
                        <MobileNavLink
                          to="/programs"
                          icon={<FaClipboardList />}
                          label="البرامج"
                        />
                        <MobileNavLink
                          to="/plans"
                          icon={<FaFileInvoiceDollar />}
                          label="الخطط"
                        />
                      </>
                    )}
                    {role === "trainee" && (
                      <>
                        <MobileNavLink
                          to="/profile"
                          icon={<FaUser />}
                          label="الملف الشخصي"
                        />
                        <MobileNavLink
                          to="/dashboard"
                          icon={<FaTachometerAlt />}
                          label="لوحة القيادة"
                        />
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center w-full transition duration-300"
                    >
                      <FaSignOutAlt />
                      تسجيل خروج
                    </button>
                  </>
                ) : (
                  <>
                    <MobileNavLink
                      to="/login"
                      icon={<FaSignInAlt />}
                      label="تسجيل الدخول"
                    />
                    <MobileNavLink
                      to="/sign-up"
                      icon={<FaUserPlus />}
                      label="التسجيل"
                    />
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

const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="text-white flex items-center hover:text-gray-300 transition duration-300 gap-x-2"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
