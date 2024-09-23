/* eslint-disable react/prop-types */
import Modal from "../../components/common/Modal";

const FormImagesModal = ({
  isOpen,
  closeModal,
  currentImages,
  previousImages,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title="صور الحالة الحالية والسابقة"
    >
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg">الحالة الحالية:</h3>
          <div className="grid grid-cols-3 gap-4">
            {currentImages.length > 0 ? (
              currentImages.map((src, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${src}`}
                  alt={`Current Form ${index + 1}`}
                  className="w-full h-32 object-cover rounded shadow"
                />
              ))
            ) : (
              <p className="text-gray-500">لا توجد صور متاحة</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg">الحالة السابقة:</h3>
          <div className="grid grid-cols-3 gap-4">
            {previousImages.length > 0 ? (
              previousImages.map((src, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${src}`}
                  alt={`Previous Form ${index + 1}`}
                  className="w-full h-32 object-cover rounded shadow"
                />
              ))
            ) : (
              <p className="text-gray-500">لا توجد صور متاحة</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FormImagesModal;
