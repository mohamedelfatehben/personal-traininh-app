import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCalendarDay, FaPlus } from "react-icons/fa";
import ProgramModal from "./ProgramModal";
import Pagination from "../../common/Pagination";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
  createProgramApi,
  deleteProgramApi,
  getProgramsApi,
  updateProgramApi,
} from "../../../api/trainer";
import Spinner from "../../common/Spinner";
import { useSelector } from "react-redux";

const ProgramsSection = () => {
  const user = useSelector((state) => state.authReducer);
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPrograms(currentPage);
  }, [currentPage]);

  const fetchPrograms = async (page) => {
    setIsLoading(true);
    if (user.token) {
      const { data } = await getProgramsApi(page, itemsPerPage, user.token);
      setPrograms(data.items);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    }
  };

  const handleSaveProgram = async (program) => {
    if (currentProgram) {
      await updateProgramApi(currentProgram._id, program, user.token);
    } else {
      await createProgramApi(program, user.token);
    }
    fetchPrograms(currentPage);
    setIsProgramModalOpen(false);
    setCurrentProgram(null);
  };

  const openProgramModal = (program = null) => {
    setCurrentProgram(program);
    setIsProgramModalOpen(true);
  };

  const closeProgramModal = () => {
    setCurrentProgram(null);
    setIsProgramModalOpen(false);
  };

  const openConfirmationModal = (program) => {
    setProgramToDelete(program);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setProgramToDelete(null);
    setIsConfirmationModalOpen(false);
  };

  const handleDelete = async () => {
    await deleteProgramApi(programToDelete._id, user.token);
    fetchPrograms(currentPage);
    closeConfirmationModal();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white shadow-lg w-full rounded-lg p-4 md:p-6 mb-4 md:mb-8">
      <div className="flex items-center mb-4">
        <FaCalendarDay className="text-indigo-600 text-2xl mr-2" />
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
          Manage Programs
        </h3>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800 flex items-center ml-auto"
          onClick={() => openProgramModal()}
        >
          <FaPlus className="mr-2" /> Add Program
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
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-left">Days</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs?.map((program) => (
                <tr key={program._id}>
                  <td className="py-2 px-4 border-b">{program.name}</td>
                  <td className="py-2 px-4 border-b">{program.description}</td>
                  <td className="py-2 px-4 border-b">
                    {Object.keys(program.days).map((day) => (
                      <div key={day}>
                        {day}: {program.days[day]?.name || "N/A"}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openProgramModal(program)}
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
      <ProgramModal
        isOpen={isProgramModalOpen}
        closeModal={closeProgramModal}
        saveProgram={handleSaveProgram}
        program={currentProgram}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        title="Program"
        onConfirm={handleDelete}
        onCancel={closeConfirmationModal}
      />
    </div>
  );
};

export default ProgramsSection;
