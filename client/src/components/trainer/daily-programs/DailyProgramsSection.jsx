import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCalendarDay, FaPlus } from "react-icons/fa";
import DailyProgramModal from "./DailyProgramModal";
import Pagination from "../../common/Pagination";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
  createDailyProgramApi,
  deleteDailyProgramApi,
  getDailyProgramsApi,
  updateDailyProgramApi,
} from "../../../api/trainer";
import Spinner from "../../common/Spinner";
import { useSelector } from "react-redux";
import Excerpted from "../../common/Excerepted";

const DailyProgramsSection = () => {
  const user = useSelector((state) => state.authReducer);
  const [dailyPrograms, setDailyPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDailyProgramModalOpen, setIsDailyProgramModalOpen] = useState(false);
  const [currentDailyProgram, setCurrentDailyProgram] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [dailyProgramToDelete, setDailyProgramToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDailyPrograms(currentPage);
  }, [currentPage]);

  const fetchDailyPrograms = async (page) => {
    setIsLoading(true);
    if (user.token) {
      const { data } = await getDailyProgramsApi(
        page,
        itemsPerPage,
        user.token
      );
      setDailyPrograms(data.items);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    }
  };

  const handleSaveDailyProgram = async (dailyProgram) => {
    if (currentDailyProgram) {
      await updateDailyProgramApi(
        currentDailyProgram._id,
        dailyProgram,
        user.token
      );
    } else {
      await createDailyProgramApi(dailyProgram, user.token);
    }
    fetchDailyPrograms(currentPage);
    setIsDailyProgramModalOpen(false);
    setCurrentDailyProgram(null);
  };

  const openDailyProgramModal = (dailyProgram = null) => {
    setCurrentDailyProgram(dailyProgram);
    setIsDailyProgramModalOpen(true);
  };

  const closeDailyProgramModal = () => {
    setCurrentDailyProgram(null);
    setIsDailyProgramModalOpen(false);
  };

  const openConfirmationModal = (dailyProgram) => {
    setDailyProgramToDelete(dailyProgram);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setDailyProgramToDelete(null);
    setIsConfirmationModalOpen(false);
  };

  const handleDelete = async () => {
    await deleteDailyProgramApi(dailyProgramToDelete._id, user.token);
    fetchDailyPrograms(currentPage);
    closeConfirmationModal();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white w-full shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8">
      <div className="flex items-center mb-4">
        <FaCalendarDay className="text-indigo-600 text-2xl mr-2" />
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
          إدارة البرامج اليومية
        </h3>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800 flex items-center mx-auto"
          onClick={() => openDailyProgramModal()}
        >
          <FaPlus className="mr-2" /> إضافة برنامج يومي
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
                <th className="py-2 px-4 border-b text-left">
                  مجموعات العضلات
                </th>
                <th className="py-2 px-4 border-b text-left">عدد الوجبات</th>
                <th className="py-2 px-4 border-b text-left">
                  السعرات الحرارية
                </th>
                <th className="py-2 px-4 border-b text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {dailyPrograms?.map((program) => (
                <tr key={program._id}>
                  <td className="py-2 px-4 border-b">{program.name}</td>
                  <td className="py-2 px-4 border-b">
                    <Excerpted
                      text={program.exercises
                        .map((exercise) => exercise.muscleGroup)
                        .join(", ")}
                      length={20}
                      bottom={true}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{program.meals.length}</td>
                  <td className="py-2 px-4 border-b">{program.calories}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openDailyProgramModal(program)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => openConfirmationModal(program)}
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
      <DailyProgramModal
        isOpen={isDailyProgramModalOpen}
        closeModal={closeDailyProgramModal}
        saveDailyProgram={handleSaveDailyProgram}
        dailyProgram={currentDailyProgram}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        title="البرنامج اليومي"
        onConfirm={handleDelete}
        onCancel={closeConfirmationModal}
      />
    </div>
  );
};

export default DailyProgramsSection;
