/* eslint-disable react/prop-types */
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import Modal from "../common/Modal";
import { useState } from "react";
import { updatePaymentStatusApi } from "../../api/payment";

const NextPaymentModal = ({ isOpen, closeModal, payment, token, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!payment) {
    return null;
  }

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      const updatedPayment = await updatePaymentStatusApi(
        payment._id,
        "accepted",
        token
      );
      const { updatedUser } = await updatedPayment.data;
      console.log(updatedUser);
      onUpdate(updatedUser);
      closeModal();
    } catch (error) {
      console.error("فشل في قبول الدفع", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeny = async () => {
    setIsLoading(true);
    try {
      const updatedPayment = await updatePaymentStatusApi(
        payment._id,
        "denied",
        token
      );
      const { updatedUser } = await updatedPayment.data;
      await onUpdate(updatedUser);
      closeModal();
    } catch (error) {
      console.error("فشل في رفض الدفع", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="تفاصيل الدفع القادم" isOpen={isOpen} closeModal={closeModal}>
      <div className="mt-4 max-w-4xl">
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <p className="mt-2 flex items-center">
            <FaMoneyBillWave className="mr-2 text-yellow-500" />{" "}
            <strong>الخطة:</strong> {payment.plan.name}
          </p>
          <p className="mt-2 flex items-center">
            <FaMoneyBillWave className="mr-2 text-yellow-500" />{" "}
            <strong>المبلغ:</strong> {payment.amount} DA
          </p>
          {payment.image && (
            <div className="mt-4">
              <strong>دليل الدفع:</strong>
              <img
                src={`data:image/jpeg;base64,${payment.image}`}
                alt="دليل الدفع"
                className="mt-2 rounded-lg shadow-md w-full max-w-sm h-auto"
              />
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleAccept}
            className={`bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 flex items-center ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-1" />
            ) : (
              <FaCheckCircle className="mr-1" />
            )}
            قبول
          </button>
          <button
            onClick={handleDeny}
            className={`bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 flex items-center ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-1" />
            ) : (
              <FaTimesCircle className="mr-1" />
            )}
            رفض
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center"
          >
            <FaTimes className="mr-1" /> إلغاء
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default NextPaymentModal;
