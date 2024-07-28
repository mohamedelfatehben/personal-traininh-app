/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimes,
  FaImage,
  FaExclamationTriangle,
} from "react-icons/fa";
import Spinner from "../../components/common/Spinner"; // Ensure the path is correct
import Modal from "../common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentApi, updatePaymentApi } from "../../api/payment";
import { setUserInfo } from "../../redux/user";

const PaymentModal = ({ isOpen, closeModal, plan, existingPayment }) => {
  const user = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingPayment) {
      setImage(
        existingPayment.image
          ? `data:image/jpeg;base64,${existingPayment.image}`
          : null
      );
    }
  }, [existingPayment]);

  const close = () => {
    setImage(null);
    setSuccess(false);
    setLoading(false);
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!image) {
      setError("Image is required for remote payments");
      setLoading(false);
      return;
    }

    try {
      const userId = window.localStorage.getItem("id");
      if (!userId) {
        setError("User ID not found in local storage");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.set("userId", userId);
      formData.set("planId", plan._id);
      formData.set("amount", plan.price);
      formData.set("type", "remote");
      formData.set("image", image);

      let paymentResponse;
      if (existingPayment) {
        paymentResponse = await updatePaymentApi(existingPayment._id, formData);
      } else {
        paymentResponse = await createPaymentApi(formData);
      }

      setSuccess(true);
      const updatedPayment = paymentResponse.data;
      dispatch(setUserInfo({ ...user, nextPayment: updatedPayment }));
      setTimeout(() => {
        close();
      }, 3000);
    } catch (err) {
      setError("Failed to submit payment");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setError("");
  };

  const removeImage = () => {
    setImage(null);
  };

  const calculateEndDate = () => {
    let endDate;
    switch (plan.paymentType) {
      case "monthly":
        endDate = "one month";
        break;
      case "by day":
        endDate = `${plan.days} days`;
        break;
      default:
        endDate = "";
    }
    return endDate;
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title={existingPayment ? "Update Payment Proof" : "Submit Payment Proof"}
    >
      {success ? (
        <div className="mt-4 flex items-center text-green-600">
          <FaCheckCircle className="mr-2" />
          Payment {existingPayment ? "updated" : "submitted"} successfully. It
          will be confirmed soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-sm">
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Plan: {plan.name}
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-2">
              Amount: {plan.price} DA
            </label>
            {image ? (
              <div className="mt-2 relative">
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="Payment Proof"
                  className="w-full h-48 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  onClick={removeImage}
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className="mt-2 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                />
                <FaImage className="ml-2 text-gray-500" size={24} />
              </div>
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
            <FaExclamationTriangle className="mr-2" />
            Your payment will end after: {calculateEndDate()}
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 flex items-center"
              onClick={close}
            >
              <FaTimes className="mr-1" /> Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <Spinner className="mr-1" />
              ) : (
                <FaCheckCircle className="mr-1" />
              )}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default PaymentModal;
