/* eslint-disable react/prop-types */
import { Dialog } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

const PlanDetailsModal = ({ isOpen, closeModal, selectedDate, formatDate }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-xl relative">
            <Dialog.Title
              as="h3"
              className="text-lg font-bold text-gray-900 text-center"
            >
              Plan Details
            </Dialog.Title>
            <div className="mt-4">
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={closeModal}
              >
                <FaTimes size={20} />
              </button>
              {selectedDate && (
                <div>
                  <p>
                    <strong>Date:</strong> {formatDate(selectedDate.date)}
                  </p>
                  <p>
                    <strong>Details:</strong> {selectedDate.details}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default PlanDetailsModal;
