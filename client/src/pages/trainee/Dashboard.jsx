/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import {
  FaBell,
  FaClipboardList,
  FaCalendarCheck,
  FaUpload,
  FaEdit,
  FaRegCalendarCheck,
} from "react-icons/fa";
import PlanSelection from "../../components/trainee/PlanSelection";
import PaymentModal from "../../components/trainee/PaymentModal";
import MultiStepForm from "../../components/trainee/MultiStepForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";

const localizer = momentLocalizer(moment);

const ClientDashboard = () => {
  const user = useSelector((state) => state.authReducer);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isUpdatePaymentModalOpen, setIsUpdatePaymentModalOpen] =
    useState(false);
  const [isMultiStepFormOpen, setIsMultiStepFormOpen] = useState(false);

  const plans = [
    {
      title: "Plan details for 22nd July",
      start: new Date("2024-07-22"),
      end: new Date("2024-07-22"),
    },
    {
      title: "Plan details for 25th July",
      start: new Date("2024-07-25"),
      end: new Date("2024-07-25"),
    },
  ];

  const getDaysOfWeek = () => {
    const today = moment();
    const startOfWeek = today.startOf("week");
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.clone().add(i, "days");
      days.push(day);
    }

    return days;
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
                    <FaUpload className="mr-2" /> Update Payment Proof
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
                    <FaUpload className="mr-2" /> Update Payment Proof
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {user.plan?.subscriptionEnd &&
        !user.nextPayment &&
        new Date(user.plan?.subscriptionEnd) < new Date() ? (
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
            <PlanSelection />
          </div>
        ) : user.plan && new Date(user.plan?.subscriptionEnd) > new Date() ? (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8 md:w-3/4 md:mr-4">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
                  Daily programs
                </h3>
                <div className="block md:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {getDaysOfWeek().map((day) => {
                      const isToday = day.isSame(moment(), "day");
                      const plan = plans.find(
                        (p) =>
                          moment(p.start).format("YYYY-MM-DD") ===
                          day.format("YYYY-MM-DD")
                      );
                      return (
                        <div
                          key={day.format("YYYY-MM-DD")}
                          className={`p-4 rounded-md shadow-md ${
                            isToday
                              ? "bg-indigo-700 text-white"
                              : plan
                              ? "bg-indigo-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className="font-semibold">
                              {day.format("dddd")}
                            </p>
                            {isToday && (
                              <p className="mt-2 flex items-center">
                                <FaRegCalendarCheck className="mr-2" /> Today
                              </p>
                            )}
                          </div>
                          {plan ? (
                            <a
                              className="mt-2 bg-white text-indigo-500 py-1 px-3 rounded"
                              href={`/daily-program/${day.format(
                                "YYYY-MM-DD"
                              )}`}
                            >
                              View Daily Program
                            </a>
                          ) : (
                            <p className="mt-2">You have no program.</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="hidden md:block">
                  <Calendar
                    localizer={localizer}
                    events={plans}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={(event) =>
                      (window.location.href = `/daily-program/${moment(
                        event.start
                      ).format("YYYY-MM-DD")}`)
                    }
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: "#4F46E5", // Indigo for events
                        color: "#FFFFFF", // White text for events
                      },
                    })}
                  />
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8 md:w-1/4 md:ml-4">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
                  Notifications
                </h3>
                <ul className="list-none">
                  <li className="mb-2">
                    <FaBell className="text-indigo-500 mr-2 inline" />
                    Your session on 12th July has been completed.
                  </li>
                  <li className="mb-2">
                    <FaBell className="text-indigo-500 mr-2 inline" />
                    Your session on 18th July is upcoming.
                  </li>
                </ul>
              </div>
            </div>
            <PlanSelection />
          </>
        ) : (
          <PlanSelection />
        )}
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
    </Layout>
  );
};

export default ClientDashboard;

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};
