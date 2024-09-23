/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../common/Modal";
import { FaPlus, FaTimes } from "react-icons/fa"; // Importing the plus and times icons
import { submitFormImagesApi } from "../../api/users";
import { useSelector } from "react-redux";

const UploadFormImagesModal = ({ isOpen, closeModal }) => {
  const user = useSelector((state) => state.authReducer);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit the number of selected files to 3
    if (files.length + selectedFiles.length > 3) {
      toast.error("يمكنك تحميل 3 صور فقط.");
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Generate preview URLs for the selected files
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleImageDelete = (indexToDelete) => {
    // Remove the image from the preview and the file list
    setPreviewImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete)
    );
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      toast.error("يجب عليك تحميل صورة واحدة على الأقل.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    setIsSubmitting(true);

    try {
      await submitFormImagesApi(formData, user.token);
      toast.success("تم تحديث الصور بنجاح!");
      closeModal(); // Close the modal on success
    } catch (err) {
      toast.error(err.response?.data?.msg || "حدث خطأ ما.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="تحميل الصور">
      <form onSubmit={handleSubmit} className="gap-y-4">
        <div className="flex items-center flex-wrap gap-x-4 py-4">
          {/* Image Preview */}
          {previewImages.length > 0 && (
            <div className="flex items-center justify-center flex-wrap gap-4">
              {previewImages.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded shadow"
                  />
                  {/* Delete button */}
                  <button
                    type="button"
                    className="absolute top-0 right-0 mt-1 mr-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-800"
                    onClick={() => handleImageDelete(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload button with plus sign */}
          {previewImages.length < 3 && (
            <label
              htmlFor="image-upload"
              className="flex justify-center items-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
            >
              <FaPlus className="text-gray-400 text-3xl" />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-x-4">
          <button
            type="button"
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={closeModal}
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري التحميل..." : "تحميل"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadFormImagesModal;
