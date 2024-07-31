/* eslint-disable react/prop-types */
import Modal from "../common/Modal";

const ExerciseModal = ({ isOpen, closeModal, exercise }) => {
  if (!exercise) return null;

  const getVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = exercise.videoUrl ? getVideoId(exercise.videoUrl) : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <Modal
      title={"Exercise: " + exercise.name}
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          {exercise.image ? (
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full max-w-md h-64 bg-gray-300 flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            <strong className="text-indigo-700">Muscle Group:</strong>{" "}
            {exercise.muscleGroup}
          </p>
          <p className="text-gray-700 mb-4">
            <strong className="text-indigo-700">Description:</strong>{" "}
            {exercise.description}
          </p>
          {videoId ? (
            <div className="mb-4 max-w-full">
              <h3 className="text-lg font-semibold mb-2 text-indigo-700">
                Video
              </h3>
              <iframe
                width="100%"
                height="315"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Exercise Video"
                className="rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = ""; // Clear the src to hide the iframe
                  e.target.parentElement.innerHTML =
                    "<p class='text-red-500'>Video not available</p>";
                }}
              ></iframe>
            </div>
          ) : (
            <div className="mb-4 text-red-500">
              <p>Video not available</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ExerciseModal;
