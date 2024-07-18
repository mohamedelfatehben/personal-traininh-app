/* eslint-disable react/prop-types */
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex items-end flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
