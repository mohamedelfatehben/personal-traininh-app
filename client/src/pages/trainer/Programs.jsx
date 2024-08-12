import { useState } from "react";
import Layout from "../../components/Layout";
import ProgramsSection from "../../components/trainer/programs/ProgramsSections";
import DailyProgramsSection from "../../components/trainer/daily-programs/DailyProgramsSection";
import ExercisesSection from "../../components/trainer/exercises/ExercisesSection";

const TrainerManagementPage = () => {
  const [section, setSection] = useState("programs");

  return (
    <Layout>
      <div className="p-4 md:p-6 bg-gray-100 pt-28">
        <div className="flex flex-col md:flex-row md:justify-center gap-x-2 mb-6">
          <div className="flex gap-x-4 mb-4 md:mb-0">
            <button
              className={`py-2 px-4 rounded ${
                section === "programs"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setSection("programs")}
            >
              البرامج
            </button>
            <button
              className={`py-2 px-4 rounded ${
                section === "dailyPrograms"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setSection("dailyPrograms")}
            >
              البرامج اليومية
            </button>
            <button
              className={`py-2 px-4 rounded ${
                section === "exercises"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setSection("exercises")}
            >
              التمارين
            </button>
          </div>
        </div>

        {section === "programs" && <ProgramsSection />}
        {section === "dailyPrograms" && <DailyProgramsSection />}
        {section === "exercises" && <ExercisesSection />}
      </div>
    </Layout>
  );
};

export default TrainerManagementPage;
