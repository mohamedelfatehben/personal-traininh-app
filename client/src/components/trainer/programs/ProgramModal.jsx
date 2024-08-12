/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import { getAllDailyProgramsApi } from "../../../api/trainer";
import { useSelector } from "react-redux";

const ProgramModal = ({ isOpen, closeModal, saveProgram, program }) => {
  const user = useSelector((state) => state.authReducer);
  const [dailyPrograms, setDailyPrograms] = useState(null);
  const [name, setName] = useState(program ? program.name : "");
  const [description, setDescription] = useState(
    program ? program.description : ""
  );
  const [days, setDays] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchDailyPrograms = async () => {
    if (user.token) {
      const { data } = await getAllDailyProgramsApi(user.token);
      setDailyPrograms(data);
    }
  };
  useEffect(() => {
    fetchDailyPrograms();
  }, []);
  useEffect(() => {
    if (program) {
      setName(program.name);
      setDescription(program.description);
      let newDays = {};
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => {
        if (program.days[day]) {
          newDays[day] = program.days[day]._id;
        } else return;
      });
      setDays({ ...newDays });
    } else {
      setName("");
      setDescription("");
      setDays({});
    }
  }, [program]);

  const handleDayChange = (day, dailyProgramId) => {
    setDays({ ...days, [day]: dailyProgramId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await saveProgram({ name, description, days });
    setIsSubmitting(false);
  };
  const close = () => {
    setIsSubmitting(false);
    setDays({});
    setName("");
    setDescription("");
    closeModal();
  };
  return (
    <Modal title="البرنامج" isOpen={isOpen} closeModal={close}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              الاسم
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="اسم البرنامج"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              الوصف
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="وصف البرنامج"
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "الاثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
            "السبت",
            "الأحد",
          ].map((day) => {
            return (
              <div key={day}>
                <label className="block text-sm sm:text-base font-semibold text-indigo-700">
                  {day}
                </label>
                <select
                  value={days[day] || ""}
                  onChange={(e) => handleDayChange(day, e.target.value)}
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
                >
                  <option value="">اختر البرنامج اليومي</option>
                  {dailyPrograms?.map((dp) => (
                    <option key={dp._id} value={dp._id}>
                      {dp.name}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={closeModal}
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جارٍ الحفظ..." : "حفظ"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProgramModal;
