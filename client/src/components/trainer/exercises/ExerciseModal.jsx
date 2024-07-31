/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "../../common/Modal";

const ExerciseModal = ({ isOpen, closeModal, saveExercise, exercise }) => {
  const [name, setName] = useState(exercise ? exercise.name : "");
  const [muscleGroup, setMuscleGroup] = useState(
    exercise ? exercise.muscleGroup : ""
  );
  const [description, setDescription] = useState(
    exercise ? exercise.description : ""
  );
  const [videoUrl, setVideoUrl] = useState(exercise ? exercise.videoUrl : "");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    exercise ? exercise.image : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (exercise) {
      setName(exercise.name);
      setMuscleGroup(exercise.muscleGroup);
      setDescription(exercise.description);
      setVideoUrl(exercise.videoUrl);
      setPreviewImage(exercise.image);
      setImageFile(null);
    } else {
      setName("");
      setMuscleGroup("");
      setDescription("");
      setVideoUrl("");
      setPreviewImage(null);
      setImageFile(null);
    }
  }, [exercise]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const exerciseData = { name, muscleGroup, description, videoUrl };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        exerciseData.image = reader.result;
        saveExercise(exerciseData).finally(() => setIsSubmitting(false));
      };
      reader.readAsDataURL(imageFile);
    } else {
      exerciseData.image = previewImage;
      saveExercise(exerciseData).finally(() => setIsSubmitting(false));
    }
  };

  return (
    <Modal title="Exercise" isOpen={isOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="Enter exercise name"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              Muscle Group
            </label>
            <input
              type="text"
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="Enter muscle group"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              Video URL
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="Enter video URL"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm sm:text-base font-semibold text-indigo-700">
            Image
          </label>
          {previewImage ? (
            <div className="relative w-full max-w-xs mx-auto">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-0 right-0 mt-2 mr-2 bg-white text-red-600 hover:text-red-800"
                onClick={handleRemoveImage}
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              accept="image/*"
            />
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ExerciseModal;
