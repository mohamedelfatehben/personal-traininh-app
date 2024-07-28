/* eslint-disable react/prop-types */

import Navbar from "./common/Navbar";

function Layout({ children }) {
  return (
    <div className="flex flex-col w-screen overflow-x-hidden bg-gray-100 pt-24 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
