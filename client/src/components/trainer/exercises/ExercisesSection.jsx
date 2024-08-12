import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaDumbbell, FaPlus } from "react-icons/fa";
import ExerciseModal from "./ExerciseModal";
import Pagination from "../../common/Pagination";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
  createExerciseApi,
  deleteExerciseApi,
  getExercisesApi,
  updateExerciseApi,
} from "../../../api/trainer";
import Spinner from "../../common/Spinner";
import { useSelector } from "react-redux";
import Excerpted from "../../common/Excerepted";

const ExercisesSection = () => {
  const user = useSelector((state) => state.authReducer);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchExercises(currentPage);
  }, [currentPage]);

  const fetchExercises = async (page) => {
    setIsLoading(true);
    if (user.token) {
      const { data } = await getExercisesApi(page, itemsPerPage, user.token);
      setExercises(data.items);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    }
  };

  const handleSaveExercise = async (exercise) => {
    if (currentExercise) {
      await updateExerciseApi(currentExercise._id, exercise, user.token);
    } else {
      await createExerciseApi(exercise, user.token);
    }
    fetchExercises(currentPage);
    setIsExerciseModalOpen(false);
    setCurrentExercise(null);
  };

  const openExerciseModal = (exercise = null) => {
    setCurrentExercise(exercise);
    setIsExerciseModalOpen(true);
  };

  const closeExerciseModal = () => {
    setCurrentExercise(null);
    setIsExerciseModalOpen(false);
  };

  const openConfirmationModal = (exercise) => {
    setExerciseToDelete(exercise);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setExerciseToDelete(null);
    setIsConfirmationModalOpen(false);
  };

  const handleDelete = async () => {
    await deleteExerciseApi(exerciseToDelete._id, user.token);
    fetchExercises(currentPage);
    closeConfirmationModal();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderVideo = (url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <iframe
          width="200"
          height="150"
          src={embedUrl}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    );
  };

  return (
    <div className="bg-white shadow-lg w-full rounded-lg p-4 md:p-6 mb-4 md:mb-8">
      <div className="flex items-center mb-4">
        <FaDumbbell className="text-green-600 text-2xl mr-2" />
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
          إدارة التمارين
        </h3>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800 flex items-center mx-auto"
          onClick={() => openExerciseModal()}
        >
          <FaPlus className="mr-2" /> إضافة تمرين
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Spinner />
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">الاسم</th>
                <th className="py-2 px-4 border-b text-left">مجموعة العضلات</th>
                <th className="py-2 px-4 border-b text-left">الوصف</th>
                <th className="py-2 px-4 border-b text-left">الفيديو</th>
                <th className="py-2 px-4 border-b text-left">الصورة</th>
                <th className="py-2 px-4 border-b text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {exercises?.map((exercise) => (
                <tr key={exercise._id}>
                  <td className="py-2 px-4 border-b">{exercise.name}</td>
                  <td className="py-2 px-4 border-b">{exercise.muscleGroup}</td>
                  <td className="py-2 px-4 border-b">
                    <Excerpted
                      bottom={true}
                      text={exercise.description}
                      length={20}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {renderVideo(exercise.videoUrl)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {exercise.image && (
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="w-16 h-16 object-cover"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openExerciseModal(exercise)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => openConfirmationModal(exercise)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <ExerciseModal
        isOpen={isExerciseModalOpen}
        closeModal={closeExerciseModal}
        saveExercise={handleSaveExercise}
        exercise={currentExercise}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        title="تمرين"
        onConfirm={handleDelete}
        onCancel={closeConfirmationModal}
      />
    </div>
  );
};

export default ExercisesSection;
