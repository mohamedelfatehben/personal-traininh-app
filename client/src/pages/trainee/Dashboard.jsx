import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  FaClipboardList,
  FaCalendarCheck,
  FaEdit,
  FaDumbbell,
  FaUtensils,
} from "react-icons/fa";
import PlanSelection from "../../components/trainee/PlanSelection";
import PaymentModal from "../../components/trainee/PaymentModal";
import MultiStepForm from "../../components/trainee/MultiStepForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";
import ExerciseModal from "../../components/trainee/ExerciseModal";

const ClientDashboard = () => {
  const user = useSelector((state) => state.authReducer);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isUpdatePaymentModalOpen, setIsUpdatePaymentModalOpen] =
    useState(false);
  const [isMultiStepFormOpen, setIsMultiStepFormOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
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

  useEffect(() => {
    if (user.plan?.subscriptionEnd) {
      const subscriptionEnd = new Date(user.plan?.subscriptionEnd);
      const today = new Date();
      const daysLeft = Math.ceil(
        (subscriptionEnd - today) / (1000 * 60 * 60 * 24)
      );

      if (daysLeft > 0 && daysLeft <= 3) {
        toast.info(
          `Your subscription will end in ${daysLeft} days. Please pay attention to that!`,
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
          Welcome, {user.name}!
        </h2>
        <p className="mb-4 md:mb-6 text-lg text-gray-800 font-semibold">
          Welcome to our top-notch fitness service! Get ready to transform your
          life with personalized plans and expert guidance. You can pay for your
          plan via CCP or visit our office to make an on-site payment.
        </p>

        {user.gender === "" && (
          <div className="mb-4 md:mb-6">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded flex items-center"
              onClick={() => setIsMultiStepFormOpen(true)}
            >
              <FaEdit className="mr-2" /> Complete Your Profile
            </button>
          </div>
        )}

        {user.plan?.subscriptionEnd &&
          new Date(user.plan?.subscriptionEnd) > new Date() && (
            <>
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
                  Current Plan
                </h3>
                <div className="text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaClipboardList className="text-indigo-500 mr-2" />
                    <p>
                      <strong>Plan:</strong> {user.plan?.name}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarCheck className="text-indigo-500 mr-2" />
                    <p>
                      <strong>Subscription End:</strong>{" "}
                      {user.plan?.subscriptionEnd
                        ? formatDate(user.plan?.subscriptionEnd)
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaClipboardList className="text-indigo-500 mr-2" />
                    <p>
                      <strong>Description:</strong> {user.plan?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8">
                <div className="flex justify-center gap-x-4 mb-4">
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
                      {day} {day === moment().format("dddd") && "(Today)"}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                      Exercises
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getExercisesForDay(selectedDay).length > 0 ? (
                        getExercisesForDay(selectedDay).map((exercise) => (
                          <div
                            key={exercise._id}
                            className="p-4 bg-gray-100 rounded shadow cursor-pointer"
                            onClick={() => handleExerciseClick(exercise)}
                          >
                            <FaDumbbell className="text-indigo-500 mb-2" />
                            <p className="font-semibold text-gray-700">
                              {exercise.name}
                            </p>
                            {exercise.image ? (
                              <img
                                src={exercise.image}
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
                          No exercises scheduled for {selectedDay}.
                        </p>
                      )}
                    </div>
                  </div>

                  {user.plan?.type === "exercise and nutrition" && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Meals
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {getMealsForDay(selectedDay).length > 0 ? (
                          getMealsForDay(selectedDay).map((meal) => (
                            <div
                              key={meal._id}
                              className="p-4 bg-gray-100 rounded shadow"
                            >
                              <FaUtensils className="text-indigo-500 mb-2" />
                              <p className="font-semibold text-gray-700">
                                {meal.meal} {meal.quantity}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-600">
                            No meals scheduled for {selectedDay}.
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
            <p className="font-bold">Payment Processing</p>
            <p>
              Your payment is currently being processed by the trainer. You will
              be notified once it is confirmed.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between mt-4">
              <div className="flex flex-col">
                <p>
                  <strong>Plan:</strong> {user.nextPayment.plan.name}
                </p>
                <p>
                  <strong>Amount:</strong> ${user.nextPayment.amount}
                </p>
              </div>
              {user.nextPayment.image && (
                <div className="flex items-center mt-4 md:mt-0">
                  <img
                    src={`data:image/jpeg;base64,${user.nextPayment.image}`}
                    alt="Payment Proof"
                    className="w-32 h-32 rounded-lg shadow-lg mr-4"
                  />
                  <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded flex items-center"
                    onClick={() => setIsUpdatePaymentModalOpen(true)}
                  >
                    Update Payment Proof
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
            <p className="font-bold">Payment Denied</p>
            <p>
              Unfortunately, your payment was denied. Please update your payment
              proof or contact support.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between mt-4">
              <div className="flex flex-col">
                <p>
                  <strong>Plan:</strong> {user.nextPayment.plan.name}
                </p>
                <p>
                  <strong>Amount:</strong> ${user.nextPayment.amount}
                </p>
              </div>
              {user.nextPayment.image && (
                <div className="flex items-center mt-4 md:mt-0">
                  <img
                    src={`data:image/jpeg;base64,${user.nextPayment.image}`}
                    alt="Payment Proof"
                    className="w-32 h-32 rounded-lg shadow-lg mr-4"
                  />
                  <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded flex items-center"
                    onClick={() => setIsUpdatePaymentModalOpen(true)}
                  >
                    Update Payment Proof
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
                  Your subscription has ended
                </h3>
                <p className="text-gray-600">
                  Your {user.plan?.name} plan has ended on{" "}
                  {formatDate(user.plan?.subscriptionEnd)}.
                </p>
                <button
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded"
                  onClick={() => setIsPaymentModalOpen(true)}
                >
                  Renew Plan
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
          existingPayment={user.nextPayment} // Pass the existing payment details if available
        />
      )}

      {isUpdatePaymentModalOpen && (
        <PaymentModal
          isOpen={isUpdatePaymentModalOpen}
          closeModal={() => setIsUpdatePaymentModalOpen(false)}
          plan={user.nextPayment?.plan}
          existingPayment={user.nextPayment} // Pass the existing payment details if available
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
