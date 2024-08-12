/* eslint-disable react/prop-types */
import Navbar from "./common/Navbar";

function Layout({ children }) {
  return (
    <div
      className="flex flex-col w-screen overflow-x-hidden bg-gray-100 min-h-screen pt-20"
      style={{ direction: "rtl" }}
    >
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
