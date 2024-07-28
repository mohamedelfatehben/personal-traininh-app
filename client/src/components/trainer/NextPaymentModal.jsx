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
      console.error("Failed to accept payment", error);
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
      console.error("Failed to deny payment", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Next Payment Details" isOpen={isOpen} closeModal={closeModal}>
      <div className="mt-4 max-w-4xl">
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <p className="mt-2 flex items-center">
            <FaMoneyBillWave className="mr-2 text-yellow-500" />{" "}
            <strong>Plan:</strong> {payment.plan.name}
          </p>
          <p className="mt-2 flex items-center">
            <FaMoneyBillWave className="mr-2 text-yellow-500" />{" "}
            <strong>Amount:</strong> {payment.amount} DA
          </p>
          {payment.image && (
            <div className="mt-4">
              <strong>Payment Proof:</strong>
              <img
                src={`data:image/jpeg;base64,${payment.image}`}
                alt="Payment Proof"
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
            Accept
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
            Deny
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center"
          >
            <FaTimes className="mr-1" /> Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NextPaymentModal;
