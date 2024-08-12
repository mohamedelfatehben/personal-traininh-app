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
    <Modal title={"تفاصيل المستخدم"} isOpen={isOpen} closeModal={closeModal}>
      <div className="mt-4 max-w-3xl">
        <div className="flex flex-col gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-indigo-700 flex items-center mb-4">
              <FaUser className="mr-2" /> معلومات شخصية
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-2">
              <p className="flex flex-row items-center mb-2">
                <FaUser className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">الاسم:</strong> {user.name}
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaEnvelope className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">البريد الإلكتروني:</strong>{" "}
                {user.email}
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaCalendarAlt className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">العمر:</strong>{" "}
                {user.age || "N/A"}
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaRulerVertical className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">الطول:</strong>{" "}
                {user.height || "N/A"} سم
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaWeight className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">الوزن:</strong>{" "}
                {user.weight || "N/A"} كجم
              </p>
              <p className="flex flex-row items-center mb-2">
                <FaGenderless className="mr-2 text-indigo-500" />{" "}
                <strong className="text-nowrap">الجنس:</strong>{" "}
                {user.gender || "N/A"}
              </p>
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-700 flex items-center mb-4">
              <FaDumbbell className="mr-2" /> معلومات اللياقة
            </h3>
            <div className="flex justify-center sm:justify-start flex-wrap gap-x-2">
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaDumbbell className="mr-2 text-green-500" />{" "}
                <strong className="text-nowrap">تكرار التمارين:</strong>{" "}
                {user.trainingFrequency || "N/A"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaDumbbell className="mr-2 text-green-500" />{" "}
                <strong className="text-nowrap">الحساسية الغذائية:</strong>{" "}
                {user.foodAllergies.join(", ") || "N/A"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaMoneyBillWave className="mr-2 text-green-500" />{" "}
                <strong className="text-nowrap">الميزانية:</strong>{" "}
                {user.budget ? `${user.budget} DA` : "N/A"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaDumbbell className="mr-2 text-green-500" />{" "}
                <strong className="text-nowrap">أهداف اللياقة:</strong>{" "}
                {user.fitnessGoals || "N/A"}
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-yellow-700 flex items-center mb-4">
              <FaCalendarAlt className="mr-2" /> معلومات الخطة
            </h3>
            <div className="flex justify-center sm:justify-start flex-wrap gap-x-2">
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaCalendarAlt className="mr-2 text-yellow-500" />{" "}
                <strong className="text-nowrap">الخطة الحالية:</strong>{" "}
                {user.currentPlan ? user.currentPlan.name : "لا توجد خطة"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaCalendarAlt className="mr-2 text-yellow-500" />{" "}
                <strong className="text-nowrap">انتهاء الاشتراك:</strong>{" "}
                {user.subscriptionEnd
                  ? new Date(user.subscriptionEnd).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaMoneyBillWave className="mr-2 text-yellow-500" />{" "}
                <strong className="text-nowrap">الدفع الحالي:</strong>{" "}
                {user.currentPayment
                  ? `${user.currentPayment.amount} DA`
                  : "لا يوجد دفع"}
              </p>
              <p className="flex flex-col  sm:flex-row items-center mb-2">
                <FaMoneyBillWave className="mr-2 text-yellow-500" />{" "}
                <strong className="text-nowrap">الدفع القادم:</strong>{" "}
                {user.nextPayment
                  ? `${user.nextPayment.amount} DA`
                  : "لا يوجد دفع"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center"
          >
            <FaTimes className="mr-1" /> إغلاق
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
