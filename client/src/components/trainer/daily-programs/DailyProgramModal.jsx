/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../../common/Modal";
import { getAllExercisesApi } from "../../../api/trainer";
import { useSelector } from "react-redux";

const DailyProgramModal = ({
  isOpen,
  closeModal,
  saveDailyProgram,
  dailyProgram,
}) => {
  const user = useSelector((state) => state.authReducer);
  const [name, setName] = useState(dailyProgram ? dailyProgram.name : "");
  const [exercises, setExercises] = useState(
    dailyProgram ? dailyProgram.exercises : []
  );
  const [meals, setMeals] = useState(dailyProgram ? dailyProgram.meals : []);
  const [calories, setCalories] = useState(
    dailyProgram ? +dailyProgram.calories : 0
  );
  const [allExercises, setAllExercises] = useState([]);
  const [mealInput, setMealInput] = useState({ meal: "", quantity: "" });
  const [editingMealIndex, setEditingMealIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        if (user.token) {
          const { data } = await getAllExercisesApi(user.token);
          setAllExercises(data);
        }
      } catch (error) {
        setError("فشل في جلب التمارين");
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    if (dailyProgram) {
      setName(dailyProgram.name);
      setExercises(dailyProgram.exercises);
      setMeals(dailyProgram.meals);
      setCalories(+dailyProgram.calories);
    } else {
      setName("");
      setExercises([]);
      setMeals([]);
      setCalories(0);
    }
  }, [dailyProgram]);

  const addMeal = () => {
    if (editingMealIndex !== null) {
      const updatedMeals = meals.map((meal, index) =>
        index === editingMealIndex ? mealInput : meal
      );
      setMeals(updatedMeals);
      setEditingMealIndex(null);
    } else {
      if (mealInput.meal && mealInput.quantity) {
        setMeals([...meals, mealInput]);
      } else {
        setError("اسم الوجبة والكمية مطلوبان");
      }
    }
    setMealInput({ meal: "", quantity: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Ensure the current meal input is added to the meals list before saving
    if (mealInput.meal !== "" && mealInput.quantity !== "") {
      setMeals([...meals, mealInput]);
    }
    if (!name) {
      setError("اسم البرنامج مطلوب");
      return;
    }
    if (exercises.length === 0) {
      setError("مطلوب تمرين واحد على الأقل");
      return;
    }
    if (calories <= 0) {
      setError("يجب أن تكون السعرات الحرارية رقمًا موجبًا");
      return;
    }

    const filteredMeals = meals.filter((meal) => meal.meal && meal.quantity);

    setIsSubmitting(true);
    try {
      await saveDailyProgram({
        name,
        exercises,
        meals: filteredMeals,
        calories: +calories,
      });
      close();
    } catch (error) {
      setError("فشل في حفظ البرنامج اليومي");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExerciseChange = (e) => {
    const selectedExerciseId = e.target.value;
    const selectedExercise = allExercises.find(
      (exercise) => exercise._id === selectedExerciseId
    );
    if (
      selectedExercise &&
      !exercises.find((e) => e._id === selectedExerciseId)
    ) {
      setExercises([...exercises, selectedExercise]);
    }
  };

  const handleMealChange = (field, value) => {
    setError("");
    setMealInput({ ...mealInput, [field]: value });
  };

  const editMeal = (index) => {
    setMealInput(meals[index]);
    setEditingMealIndex(index);
  };

  const removeMeal = (index) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const close = () => {
    setName("");
    setExercises([]);
    setMeals([]);
    setCalories(0);
    setError("");
    setMealInput({ meal: "", quantity: "" });
    closeModal();
  };

  return (
    <Modal title="البرنامج اليومي" isOpen={isOpen} closeModal={close}>
      <form onSubmit={handleSubmit} className="gap-y-4">
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              اسم البرنامج
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="أدخل اسم البرنامج"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              التمارين
            </label>
            <select
              onChange={handleExerciseChange}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
            >
              <option value="">اختر تمرين</option>
              {allExercises
                .filter((exercise) =>
                  exercises.every((e) => e._id !== exercise._id)
                )
                ?.map((exercise) => (
                  <option key={exercise._id} value={exercise._id}>
                    {exercise.name}
                  </option>
                ))}
            </select>
            <div className="mt-2 flex gap-x-1 gap-y-2 flex-wrap">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-indigo-100 text-indigo-700 flex justify-between items-center px-2 py-1 rounded w-fit"
                >
                  <span>{exercise.name}</span>
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm sm:text-base font-semibold text-indigo-700">
            الوجبات
          </label>
          <div className="flex items-center gap-x-2">
            <input
              type="text"
              value={mealInput.meal}
              onChange={(e) => handleMealChange("meal", e.target.value)}
              className="p-2 flex-grow shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="اسم الوجبة"
            />
            <input
              type="text"
              value={mealInput.quantity}
              onChange={(e) => handleMealChange("quantity", e.target.value)}
              className="p-2 flex-grow shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="الكمية"
            />
            <button
              type="button"
              onClick={addMeal}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              {editingMealIndex !== null ? "تحديث الوجبة" : "إضافة وجبة"}
            </button>
          </div>
          <div className="mt-2 flex gap-x-1 gap-y-2 flex-wrap">
            {meals.map((meal, index) => (
              <div
                key={index}
                className="bg-indigo-100 text-indigo-700 flex justify-between items-center px-2 py-1 rounded w-fit"
              >
                <span>
                  {meal.meal} ({meal.quantity})
                </span>
                <div className="flex gap-x-2">
                  <button
                    type="button"
                    onClick={() => editMeal(index)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMeal(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm sm:text-base font-semibold text-indigo-700">
            السعرات الحرارية
          </label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
            placeholder="أدخل السعرات الحرارية"
          />
        </div>
        <div className="mt-6 flex justify-end gap-x-4">
          <button
            type="button"
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={close}
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DailyProgramModal;
