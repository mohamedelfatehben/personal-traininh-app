import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/user";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("id", "");
    localStorage.setItem("name", "");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">My App</div>
        {user.token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
