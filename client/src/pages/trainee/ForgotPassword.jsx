import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestPasswordResetApi } from "../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await requestPasswordResetApi(email);
      toast.success(
        "تم إرسال رسالة إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
      );
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8"
    >
      <ToastContainer theme="colored" />
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          استعادة كلمة المرور
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور
        </p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "استعادة كلمة المرور"
              )}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
