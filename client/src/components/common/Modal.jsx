/* eslint-disable react/prop-types */
import { Dialog } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

function Modal({ isOpen, closeModal, title, children }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
      style={{ direction: "rtl" }}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-25 h-auto"
        style={{ zIndex: "100" }}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-fit rounded bg-white p-6 shadow-xl relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={24} />
              </button>
              <Dialog.Title className="absolute -top-4 left-1/2 -translate-x-1/2 text-white bg-indigo-700 rounded-lg px-2 py-1">
                {title}
              </Dialog.Title>
              {children}
            </Dialog.Panel>
          </div>
        </div>{" "}
      </div>
    </Dialog>
  );
}

export default Modal;
