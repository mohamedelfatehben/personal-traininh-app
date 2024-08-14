/* eslint-disable react/prop-types */
import Modal from "../common/Modal";

const ExerciseModal = ({ isOpen, closeModal, exercise }) => {
  if (!exercise) return null;

  const getVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = exercise.videoUrl ? getVideoId(exercise.videoUrl) : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <Modal
      title={"التمرين: " + exercise.name}
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          {exercise.image ? (
            <img
              src={`data:image/jpeg;base64,${exercise.image}`}
              alt={exercise.name}
              className="w-auto max-w-md h-auto max-h-40 object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full max-w-md h-64 bg-gray-300 flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-gray-500">لا توجد صورة متاحة</span>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            <strong className="text-indigo-700">مجموعة العضلات:</strong>{" "}
            {exercise.muscleGroup}
          </p>
          <p className="text-gray-700 mb-4">
            <strong className="text-indigo-700">الوصف:</strong>{" "}
            {exercise.description}
          </p>
          {videoId ? (
            <div className="mb-4 max-w-full">
              <h3 className="text-lg font-semibold mb-2 text-indigo-700">
                فيديو
              </h3>
              <iframe
                width="100%"
                height="315"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="فيديو التمرين"
                className="rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = ""; // Clear the src to hide the iframe
                  e.target.parentElement.innerHTML =
                    "<p class='text-red-500'>الفيديو غير متاح</p>";
                }}
              ></iframe>
            </div>
          ) : (
            <div className="mb-4 text-red-500">
              <p>الفيديو غير متاح</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ExerciseModal;
