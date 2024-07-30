/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "../common/Modal";
import { getAllProgramsApi } from "../../api/trainer";
import { assignProgramApi } from "../../api/users";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProgramModal = ({ isOpen, closeModal, user, onSave }) => {
  const authUser = useSelector((state) => state.authReducer);
  const [programs, setPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedDays, setExpandedDays] = useState({});

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data } = await getAllProgramsApi(authUser.token);
        setPrograms(data);
      } catch (error) {
        setError("Failed to fetch programs");
      }
    };
    fetchPrograms();
  }, [authUser.token]);

  useEffect(() => {
    if (selectedProgramId) {
      const program = programs.find(
        (program) => program._id === selectedProgramId
      );
      setSelectedProgram(program);
      setExpandedDays({});
    } else {
      setSelectedProgram(null);
    }
  }, [selectedProgramId, programs]);
  useEffect(() => {
    if (user && user.program) {
      setSelectedProgramId(user.program._id);
      setSelectedProgram(user.program);
    }
  }, [user]);
  const close = () => {
    setSelectedProgram(null);
    setSelectedProgramId("");
    closeModal();
  };
  const handleAssignProgram = async () => {
    setLoading(true);
    setError("");
    try {
      await assignProgramApi(
        { userId: user._id, programId: selectedProgramId },
        authUser.token
      );
      onSave(selectedProgram);
      close();
    } catch (error) {
      setError("Failed to assign program");
    } finally {
      setLoading(false);
    }
  };

  const toggleDayExpansion = (day) => {
    setExpandedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  return (
    <Modal title="Assign Program" isOpen={isOpen} closeModal={close}>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 gap-4 max-w-2xl pt-10">
        <select
          value={selectedProgramId}
          onChange={(e) => setSelectedProgramId(e.target.value)}
          className="p-2 shadow-sm sm:text-sm border border-indigo-500 rounded-md w-fit mx-auto"
        >
          <option value="">Select program</option>
          {programs.map((program) => (
            <option key={program._id} value={program._id}>
              {program.name}
            </option>
          ))}
        </select>
        {selectedProgram && (
          <div className="mt-1 border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-indigo-700">
              {selectedProgram.name}
            </h3>
            <p className="mt-2 text-gray-600">{selectedProgram.description}</p>
            <div className="mt-4">
              <h4 className="text-md font-semibold text-indigo-700">
                Daily Programs:
              </h4>
              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                {Object.entries(selectedProgram.days).map(
                  ([day, dailyProgram]) => (
                    <div
                      key={day}
                      className="p-4 bg-indigo-100 rounded-md shadow-md w-full md:w-48"
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleDayExpansion(day)}
                      >
                        <h5 className="text-md font-semibold text-gray-700">
                          {day}
                        </h5>
                        {expandedDays[day] ? (
                          <FaChevronUp className="text-gray-700" />
                        ) : (
                          <FaChevronDown className="text-gray-700" />
                        )}
                      </div>
                      {expandedDays[day] && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Name:</span>{" "}
                            {dailyProgram.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Exercises:</span>{" "}
                            {dailyProgram.exercises
                              .map((exercise) => exercise.name)
                              .join(", ")}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Meals:</span>{" "}
                            {dailyProgram.meals
                              .map((meal) => `${meal.meal} (${meal.quantity})`)
                              .join(", ")}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Calories:</span>{" "}
                            {dailyProgram.calories}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-end gap-x-4">
          <button
            type="button"
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={close}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800"
            onClick={handleAssignProgram}
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign Program"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProgramModal;
