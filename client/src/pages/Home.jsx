import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 shadow">
          <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
            <img
              src="/logo.jfif"
              alt="Logo"
              className="w-36 h-auto mb-8 rounded-full transform transition duration-500 hover:scale-110"
            />
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
              احصل على لياقتك مع المدرب نبيل
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              انضم إلى مئات المتدربين وابدأ رحلتك نحو لياقة بدنية أفضل اليوم!
            </p>
            <Link to="/sign-up">
              <button className="mt-4 bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transform transition duration-300 hover:scale-105">
                ابدأ الآن
              </button>
            </Link>
          </div>
        </header>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                برامج تدريب مخصصة
              </h2>
              <p className="text-gray-600">
                احصل على برنامج تدريب مخصص يناسب أهدافك ومستوى لياقتك البدنية.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                خطط تغذية متكاملة
              </h2>
              <p className="text-gray-600">
                اتبع خطط تغذية مصممة خصيصًا لتلبية احتياجاتك الصحية واللياقة
                البدنية.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                متابعة وتقييم مستمر
              </h2>
              <p className="text-gray-600">
                تابع تقدمك بشكل مستمر واحصل على تقييمات دورية من المدرب نبيل.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-indigo-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              ابدأ رحلتك نحو اللياقة البدنية الآن
            </h2>
            <p className="text-lg text-indigo-200 mb-8">
              انضم إلى مئات المتدربين الذين حققوا أهدافهم بفضل برامجنا وخططنا
              المدروسة.
            </p>
            <Link to="/sign-up">
              <button className="mt-8 bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transform transition duration-300 hover:scale-105">
                اشترك الآن
              </button>
            </Link>
          </div>
        </section>

        <footer className="bg-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-indigo-700 mb-6">
              تواصل معنا
            </h3>
            <p className="text-gray-700 mb-2">
              البريد الإلكتروني:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nabilbardad90@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                nabilbardad90@gmail.com
              </a>
            </p>
            <p className="text-gray-700">
              الهاتف: <span className="block">0554892427</span>
              <span className="block">0770334959</span>
            </p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}

export default Home;
