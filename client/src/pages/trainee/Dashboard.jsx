import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  FaClipboardList,
  FaCalendarCheck,
  FaDumbbell,
  FaUtensils,
  FaEdit,
} from "react-icons/fa";
import PlanSelection from "../../components/trainee/PlanSelection";
import PaymentModal from "../../components/trainee/PaymentModal";
import MultiStepForm from "../../components/trainee/MultiStepForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";
import ExerciseModal from "../../components/trainee/ExerciseModal";
import UploadFormImagesModal from "../../components/trainee/UploadFormImagesModal";

const ClientDashboard = () => {
  const user = useSelector((state) => state.authReducer);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isUpdatePaymentModalOpen, setIsUpdatePaymentModalOpen] =
    useState(false);
  const [isMultiStepFormOpen, setIsMultiStepFormOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // New state for upload modal
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedDay, setSelectedDay] = useState(moment().format("dddd"));

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setIsExerciseModalOpen(true);
  };

  const getDaysOfWeek = () => {
    return [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
  };

  const getArabicDay = (day) => {
    const days = {
      Monday: "الاثنين",
      Tuesday: "الثلاثاء",
      Wednesday: "الأربعاء",
      Thursday: "الخميس",
      Friday: "الجمعة",
      Saturday: "السبت",
      Sunday: "الأحد",
    };
    return days[day] || day;
  };

  const getExercisesForDay = (day) => {
    const program = user.program;
    if (program && program.days && program.days[day]) {
      return program.days[day].exercises || [];
    }
    return [];
  };

  const getMealsForDay = (day) => {
    const program = user.program;
    if (program && program.days && program.days[day]) {
      return program.days[day].meals || [];
    }
    return [];
  };
  const getCaloriesForDay = (day) => {
    const program = user.program;
    if (program && program.days && program.days[day]) {
      return program.days[day].calories;
    }
    return "";
  };

  useEffect(() => {
    if (user.plan?.subscriptionEnd) {
      const subscriptionEnd = new Date(user.plan?.subscriptionEnd);
      const today = new Date();
      const daysLeft = Math.ceil(
        (subscriptionEnd - today) / (1000 * 60 * 60 * 24)
      );

      if (daysLeft > 0 && daysLeft <= 3) {
        toast.info(
          `ستنتهي اشتراكك في ${daysLeft} أيام. يرجى الانتباه إلى ذلك!`,
          {
            autoClose: 5000,
          }
        );
      }
    }
  }, [user.plan?.subscriptionEnd]);

  return (
    <Layout>
      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
        <ToastContainer />
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-indigo-700 underline">
          مرحبًا، {user.name}!
        </h2>
        <p className="mb-4 md:mb-6 text-lg text-gray-800 font-semibold">
          مرحبًا بك في خدمة اللياقة البدنية المتميزة لدينا! استعد لتحويل حياتك
          بخطط مخصصة وتوجيهات خبراء. يمكنك دفع اشتراكك عبر CCP أو زيارة مكتبنا
          للدفع الشخصي.
        </p>
        {/* Add button to open upload modal */}
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800"
          onClick={() => setIsUploadModalOpen(true)}
        >
          تحميل صور الحالة الحالية
        </button>

        {/* Render the UploadFormImagesModal */}
        {isUploadModalOpen && (
          <UploadFormImagesModal
            isOpen={isUploadModalOpen}
            closeModal={() => setIsUploadModalOpen(false)}
          />
        )}

        {user.gender === "" && (
          <div className="mb-4 md:mb-6">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded flex items-center"
              onClick={() => setIsMultiStepFormOpen(true)}
            >
              <FaEdit className="mr-2" /> أكمل ملفك الشخصي
            </button>
          </div>
        )}

        {user.plan?.subscriptionEnd &&
          new Date(user.plan?.subscriptionEnd) > new Date() && (
            <>
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
                  الخطة الحالية
                </h3>
                <div className="text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaClipboardList className="text-indigo-500 mr-2" />
                    <p>
                      <strong>الخطة:</strong> {user.plan?.name}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarCheck className="text-indigo-500 mr-2" />
                    <p>
                      <strong>نهاية الاشتراك:</strong>{" "}
                      {user.plan?.subscriptionEnd
                        ? formatDate(user.plan?.subscriptionEnd)
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaClipboardList className="text-indigo-500 mr-2" />
                    <p>
                      <strong>الوصف:</strong> {user.plan?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8">
                <div className="flex justify-center flex-wrap gap-4 mb-4">
                  {getDaysOfWeek().map((day) => (
                    <button
                      key={day}
                      className={`py-2 px-4 rounded ${
                        selectedDay === day
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                      onClick={() => setSelectedDay(day)}
                    >
                      {getArabicDay(day)}{" "}
                      {day === moment().format("dddd") && "(اليوم)"}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.plan?.type?.includes("exercise") && (
                    <div
                      className={
                        user.plan?.type === "exercise"
                          ? "md:col-span-3"
                          : "md:col-span-2"
                      }
                    >
                      <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        التمارين
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getExercisesForDay(selectedDay).length > 0 ? (
                          getExercisesForDay(selectedDay).map((exercise) => (
                            <div
                              key={exercise._id}
                              className="p-4 bg-gray-100 rounded shadow hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
                              onClick={() => handleExerciseClick(exercise)}
                            >
                              <FaDumbbell className="text-indigo-500 mb-2 text-2xl" />
                              <p className="font-semibold text-gray-700">
                                {exercise.name}
                              </p>
                              {exercise.image ? (
                                <img
                                  src={`data:image/jpeg;base64,${exercise.image}`}
                                  alt={exercise.name}
                                  className="w-full h-32 object-cover mt-2 rounded"
                                />
                              ) : (
                                <div className="w-full h-32 bg-gray-200 mt-2 rounded"></div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-600">
                            لا توجد تمارين مجدولة لـ {getArabicDay(selectedDay)}
                            .
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {user.plan?.type?.includes("nutrition") && (
                    <div
                      className={
                        user.plan?.type === "nutrition"
                          ? "md:col-span-3"
                          : "md:col-span-1"
                      }
                    >
                      <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        السعرات الحرارية :{" "}
                        <span className="font-bold">
                          {getCaloriesForDay(selectedDay)}
                        </span>
                      </h3>
                      <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        الوجبات
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {getMealsForDay(selectedDay).length > 0 ? (
                          getMealsForDay(selectedDay).map((meal) => (
                            <div
                              key={meal.name}
                              className="p-4 bg-gray-100 rounded shadow hover:shadow-lg transition-shadow duration-300 ease-in-out"
                            >
                              <FaUtensils className="text-indigo-500 mb-2 text-2xl" />
                              <p className="font-semibold text-gray-700">
                                {meal.name}
                              </p>
                              <ul className="text-gray-600">
                                {meal.ingredients.map((ingredient, index) => (
                                  <li key={index}>
                                    {ingredient.ingredient} -{" "}
                                    {ingredient.quantity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-600">
                            لا توجد وجبات مجدولة لـ {getArabicDay(selectedDay)}.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

        {user.nextPayment && user.nextPayment.status === "pending" && (
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 md:p-6 mb-4 md:mb-8"
            role="alert"
          >
            <p className="font-bold">جاري معالجة الدفع</p>
            <p>
              يتم حاليًا معالجة دفعتك بواسطة المدرب. ستتلقى إشعارًا بمجرد
              تأكيده.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between mt-4">
              <div className="flex flex-col">
                <p>
                  <strong>الخطة:</strong> {user.nextPayment.plan.name}
                </p>
                <p>
                  <strong>المبلغ:</strong> ${user.nextPayment.amount}
                </p>
              </div>
              {user.nextPayment.image && (
                <div className="flex items-center mt-4 md:mt-0">
                  <img
                    src={`data:image/jpeg;base64,${user.nextPayment.image}`}
                    alt="إثبات الدفع"
                    className="w-32 h-32 rounded-lg shadow-lg mr-4"
                  />
                  <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded flex items-center"
                    onClick={() => setIsUpdatePaymentModalOpen(true)}
                  >
                    تحديث إثبات الدفع
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {user.nextPayment && user.nextPayment.status === "denied" && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 md:p-6 mb-4 md:mb-8"
            role="alert"
          >
            <p className="font-bold">تم رفض الدفع</p>
            <p>
              لسوء الحظ، تم رفض دفعتك. يرجى تحديث إثبات الدفع أو الاتصال بالدعم.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between mt-4">
              <div className="flex flex-col">
                <p>
                  <strong>الخطة:</strong> {user.nextPayment.plan.name}
                </p>
                <p>
                  <strong>المبلغ:</strong> ${user.nextPayment.amount}
                </p>
              </div>
              {user.nextPayment.image && (
                <div className="flex items-center mt-4 md:mt-0">
                  <img
                    src={`data:image/jpeg;base64,${user.nextPayment.image}`}
                    alt="إثبات الدفع"
                    className="w-32 h-32 rounded-lg shadow-lg mr-4"
                  />
                  <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded flex items-center"
                    onClick={() => setIsUpdatePaymentModalOpen(true)}
                  >
                    تحديث إثبات الدفع
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {user.plan?.subscriptionEnd &&
          !user.nextPayment &&
          new Date(user.plan?.subscriptionEnd) < new Date() && (
            <div>
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-red-700">
                  انتهت اشتراكك
                </h3>
                <p className="text-gray-600">
                  انتهت خطة {user.plan?.name} الخاصة بك في{" "}
                  {formatDate(user.plan?.subscriptionEnd)}.
                </p>
                <button
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded"
                  onClick={() => setIsPaymentModalOpen(true)}
                >
                  تجديد الخطة
                </button>
              </div>
            </div>
          )}
        <PlanSelection />
      </div>

      {isMultiStepFormOpen && (
        <MultiStepForm
          isOpen={isMultiStepFormOpen}
          closeModal={() => setIsMultiStepFormOpen(false)}
        />
      )}

      {isPaymentModalOpen && (user.nextPayment || user.plan) && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          closeModal={() => setIsPaymentModalOpen(false)}
          plan={user.nextPayment?.plan || user.plan}
          existingPayment={user.nextPayment} // تمرير تفاصيل الدفع الحالية إذا كانت متاحة
        />
      )}

      {isUpdatePaymentModalOpen && (
        <PaymentModal
          isOpen={isUpdatePaymentModalOpen}
          closeModal={() => setIsUpdatePaymentModalOpen(false)}
          plan={user.nextPayment?.plan}
          existingPayment={user.nextPayment} // تمرير تفاصيل الدفع الحالية إذا كانت متاحة
        />
      )}

      {isExerciseModalOpen && (
        <ExerciseModal
          isOpen={isExerciseModalOpen}
          closeModal={() => setIsExerciseModalOpen(false)}
          exercise={selectedExercise}
        />
      )}
    </Layout>
  );
};

export default ClientDashboard;

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};
