/* eslint-disable react/prop-types */
import Modal from "./Modal";

const ConfirmationModal = ({ isOpen, title, onConfirm, onCancel }) => {
  return (
    <Modal title="Confirmation" isOpen={isOpen} closeModal={onCancel}>
      <div className="p-4">
        <p>{title}?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
