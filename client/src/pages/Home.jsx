// src/pages/Home.js

import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6 flex flex-col items-center">
            <img src="/logo.jfif" alt="Logo" className="w-32 h-auto mb-4" />
            <h1 className="text-4xl font-bold text-indigo-700 text-center">
              احصل على لياقتك مع المدرب نبيل
            </h1>
            <p className="mt-2 text-center text-gray-600">
              انضم إلى مئات المتدربين وابدأ رحلتك نحو لياقة بدنية أفضل اليوم!
            </p>
            <Link to="/sign-up">
              <button className="mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700">
                ابدأ الآن
              </button>
            </Link>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                برامج تدريب مخصصة
              </h2>
              <p className="mt-4 text-gray-600">
                احصل على برنامج تدريب مخصص يناسب أهدافك ومستوى لياقتك البدنية.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                خطط تغذية متكاملة
              </h2>
              <p className="mt-4 text-gray-600">
                اتبع خطط تغذية مصممة خصيصًا لتلبية احتياجاتك الصحية واللياقة
                البدنية.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                متابعة وتقييم مستمر
              </h2>
              <p className="mt-4 text-gray-600">
                تابع تقدمك بشكل مستمر واحصل على تقييمات دورية من المدرب نبيل.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-indigo-600 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              ابدأ رحلتك نحو اللياقة البدنية الآن
            </h2>
            <p className="mt-4 text-indigo-200">
              انضم إلى مئات المتدربين الذين حققوا أهدافهم بفضل برامجنا وخططنا
              المدروسة.
            </p>
            <Link to="/sign-up">
              <button className="mt-8 bg-white text-indigo-600 font-semibold py-2 px-4 rounded hover:bg-gray-100">
                اشترك الآن
              </button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Home;
