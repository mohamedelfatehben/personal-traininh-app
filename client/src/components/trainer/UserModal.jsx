/* eslint-disable react/prop-types */
import {
  FaUser,
  FaEnvelope,
  FaRulerVertical,
  FaWeight,
  FaGenderless,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaDumbbell,
  FaTimes,
} from "react-icons/fa";
import Modal from "../common/Modal";

const UserModal = ({ isOpen, closeModal, user }) => {
  if (!user) {
    return null;
  }

  return (
    <Modal title={"User Details"} isOpen={isOpen} closeModal={closeModal}>
      <div className="mt-4 max-w-3xl">
        <div className="flex flex-col gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-indigo-700 flex items-center mb-4">
              <FaUser className="mr-2" /> Personal Information
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-2">
              <p className="flex flex-row items-center mb-2">
                <FaUser className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">Name:</strong> {user.name}
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaEnvelope className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">Email:</strong> {user.email}
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaCalendarAlt className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">Age:</strong>{" "}
                {user.age || "N/A"}
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaRulerVertical className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">Height:</strong>{" "}
                {user.height || "N/A"} cm
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaWeight className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">Weight:</strong>{" "}
                {user.weight || "N/A"} kg
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaGenderless className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">Gender:</strong>{" "}
                {user.gender || "N/A"}
              </p>
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-700 flex items-center mb-4">
              <FaDumbbell className="mr-2" /> Fitness Information
            </h3>
            <div className="flex justify-center sm:justify-start flex-wrap gap-x-2">
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaDumbbell className="mr-2 text-green-500" />{" "}
                <strong className="text-nowrap">Training Frequency:</strong>{" "}
                {user.trainingFrequency || "N/A"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaDumbbell className="mr-2 text-green-500" />{" "}
                <strong className="text-nowrap">Food Allergies:</strong>{" "}
                {user.foodAllergies.join(", ") || "N/A"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaMoneyBillWave className="mr-2 text-green-500" />{" "}
                <strong className="text-nowrap">Budget:</strong>{" "}
                {user.budget ? `${user.budget} DA` : "N/A"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaDumbbell className="mr-2 text-green-500" />{" "}
                <strong className="text-nowrap">Fitness Goals:</strong>{" "}
                {user.fitnessGoals || "N/A"}
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-yellow-700 flex items-center mb-4">
              <FaCalendarAlt className="mr-2" /> Plan Information
            </h3>
            <div className="flex justify-center sm:justify-start flex-wrap gap-x-2">
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaCalendarAlt className="mr-2 text-yellow-500" />{" "}
                <strong className="text-nowrap">Current Plan:</strong>{" "}
                {user.currentPlan ? user.currentPlan.name : "No Plan"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaCalendarAlt className="mr-2 text-yellow-500" />{" "}
                <strong className="text-nowrap">Subscription End:</strong>{" "}
                {user.subscriptionEnd
                  ? new Date(user.subscriptionEnd).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaMoneyBillWave className="mr-2 text-yellow-500" />{" "}
                <strong className="text-nowrap">Current Payment:</strong>{" "}
                {user.currentPayment
                  ? `${user.currentPayment.amount} DA`
                  : "No Payment"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaMoneyBillWave className="mr-2 text-yellow-500" />{" "}
                <strong className="text-nowrap">Next Payment:</strong>{" "}
                {user.nextPayment
                  ? `${user.nextPayment.amount} DA`
                  : "No Payment"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center"
          >
            <FaTimes className="mr-1" /> Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
