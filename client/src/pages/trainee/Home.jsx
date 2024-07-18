import { useState } from "react";
import { useSelector } from "react-redux";
import MultiStepModal from "../../components/trainee/MultiStepForm";
import PlanSelection from "../../components/trainee/PlanSelection";
import {
  FaUserEdit,
  FaUser,
  FaCalendar,
  FaRulerVertical,
  FaWeight,
  FaDumbbell,
} from "react-icons/fa";

const Home = () => {
  const user = useSelector((state) => state.authReducer);
  const [openDataModel, setOpenDataModel] = useState(false);
  const [mustCompleteInfo, setMustCompleteInfo] = useState(false);

  const openProfileModal = () => {
    setOpenDataModel(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">
        Trainee Dashboard
      </h2>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 flex-grow">
            Profile Information
          </h3>
          <FaUserEdit
            className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            onClick={openProfileModal}
          />
        </div>
        <div className="text-gray-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <FaUser className="text-indigo-500 mr-2" />
            <p>
              <strong>Name:</strong> {user.name}
            </p>
          </div>
          <div className="flex items-center">
            <FaCalendar className="text-indigo-500 mr-2" />
            <p>
              <strong>Age:</strong> {user.age}
            </p>
          </div>
          <div className="flex items-center">
            <FaRulerVertical className="text-indigo-500 mr-2" />
            <p>
              <strong>Height:</strong> {user.height} cm
            </p>
          </div>
          <div className="flex items-center">
            <FaWeight className="text-indigo-500 mr-2" />
            <p>
              <strong>Weight:</strong> {user.weight} kg
            </p>
          </div>
          <div className="flex items-center">
            <FaDumbbell className="text-indigo-500 mr-2" />
            <p>
              <strong>Fitness Goals:</strong> {user.fitnessGoals}
            </p>
          </div>
        </div>
      </div>
      <PlanSelection />
      {openDataModel && (
        <MultiStepModal
          isOpen={openDataModel}
          closeModal={() => {
            setMustCompleteInfo(false);
            setOpenDataModel(false);
          }}
          mustCompleteInfo={mustCompleteInfo}
        />
      )}
    </div>
  );
};

export default Home;
