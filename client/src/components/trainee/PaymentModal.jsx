/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  FaCheckCircle,
  FaTimes,
  FaImage,
  FaExclamationTriangle,
} from "react-icons/fa";
import { createPaymentApi } from "../../api/payment";

const PaymentModal = ({ isOpen, closeModal, plan }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const close = () => {
    setImage(null);
    setSuccess(false);
    closeModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Image is required for remote payments");
      return;
    }

    try {
      const userId = window.localStorage.getItem("id");
      if (!userId) {
        setError("User ID not found in local storage");
        return;
      }

      const formData = new FormData();
      formData.set("userId", userId);
      formData.set("planId", plan._id);
      formData.set("amount", plan.price);
      formData.set("type", "remote");
      formData.set("image", image);

      // Log the formData content
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      await createPaymentApi(formData);

      setSuccess(true);
      setTimeout(() => {
        close();
      }, 3000);
    } catch (err) {
      setError("Failed to submit payment");
      console.error(err);
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
    const today = new Date();
    let endDate;
    switch (plan.paymentType) {
      case "monthly":
        endDate = new Date(today.setMonth(today.getMonth() + 1));
        break;
      case "15 days":
        endDate = new Date(today.setDate(today.getDate() + 15));
        break;
      case "weekly":
        endDate = new Date(today.setDate(today.getDate() + 7));
        break;
      default:
        endDate = today;
    }
    return endDate.toDateString();
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <DialogTitle
              as="h3"
              className="text-lg font-bold text-gray-900 flex items-center"
            >
              <FaImage className="mr-2 text-indigo-600" /> Submit Payment Proof
            </DialogTitle>

            {success ? (
              <div className="mt-4 flex items-center text-green-600">
                <FaCheckCircle className="mr-2" />
                Payment submitted successfully. It will be confirmed soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                        src={URL.createObjectURL(image)}
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
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  Your payment will end on: {calculateEndDate()}
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
                  >
                    <FaCheckCircle className="mr-1" /> Submit
                  </button>
                </div>
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
