import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth";
import { decodeToken } from "react-jwt";
import { loginUser } from "../redux/user";
import { FaSpinner } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginApi(formData); // Use the API function
      const token = response.data.token;
      localStorage.setItem("token", token); // Store the token in local storage

      // Decode the token using react-jwt
      const decodedToken = decodeToken(token);
      console.log("User Info:", decodedToken); // Log the decoded token

      // Dispatch actions to store user info in Redux
      dispatch(loginUser({ token, role: decodedToken.user.role }));
      navigate("/dashboard"); // Adjust the path as needed
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ ما أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <Link to="/">
            <img
              className="mx-auto h-16 w-auto transform transition duration-500 hover:scale-110"
              src="/logo.jfif"
              alt="Logo"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تسجيل الدخول إلى حسابك
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ليس لديك حساب؟{" "}
            <Link
              to="/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              سجل الآن
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="كلمة المرور"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin h-5 w-5 mr-3" />
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              هل نسيت كلمة المرور؟
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
