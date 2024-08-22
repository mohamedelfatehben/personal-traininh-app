/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import { getAllExercisesApi } from "../../../api/trainer";
import { useSelector } from "react-redux";
import Select from "react-select";
import { FaTrash, FaEdit } from "react-icons/fa";

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
    dailyProgram ? dailyProgram.calories : ""
  );
  const [allExercises, setAllExercises] = useState([]);
  const [mealName, setMealName] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", quantity: "" },
  ]);
  const [isEditingMeal, setIsEditingMeal] = useState(false);
  const [editingMealIndex, setEditingMealIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        if (user.token) {
          const { data } = await getAllExercisesApi(user.token);
          setAllExercises(
            data.map((ex) => ({ value: ex._id, label: ex.name }))
          );
        }
      } catch (error) {
        setError("فشل في جلب التمارين");
      }
    };

    fetchExercises();
  }, [user.token]);

  useEffect(() => {
    if (dailyProgram) {
      setName(dailyProgram.name);
      setExercises(dailyProgram.exercises);
      setMeals(dailyProgram.meals);
      setCalories(dailyProgram.calories);
    } else {
      resetForm();
    }
  }, [dailyProgram]);

  const resetForm = () => {
    setName("");
    setExercises([]);
    setMeals([]);
    setCalories("");
    setMealName("");
    setIngredients([{ ingredient: "", quantity: "" }]);
    setIsEditingMeal(false);
    setEditingMealIndex(null);
    setError("");
  };

  const handleExerciseChange = (selectedOptions) => {
    const selectedExercises = selectedOptions.map((option) => ({
      _id: option.value,
      name: option.label,
    }));
    setExercises(selectedExercises);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
    );
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", quantity: "" }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addOrUpdateMeal = () => {
    if (!mealName) {
      setError("اسم الوجبة مطلوب");
      return;
    }

    if (ingredients.some((ing) => !ing.ingredient || !ing.quantity)) {
      setError("يجب تعبئة جميع مكونات الوجبة والكمية");
      return;
    }

    const newMeal = { name: mealName, ingredients };
    if (isEditingMeal) {
      setMeals((prevMeals) =>
        prevMeals.map((meal, index) =>
          index === editingMealIndex ? newMeal : meal
        )
      );
      setIsEditingMeal(false);
      setEditingMealIndex(null);
    } else {
      setMeals((prevMeals) => [...prevMeals, newMeal]);
    }
    setMealName("");
    setIngredients([{ ingredient: "", quantity: "" }]);
    setError("");
  };

  const editMeal = (index) => {
    const meal = meals[index];
    setMealName(meal.name);
    setIngredients(meal.ingredients);
    setIsEditingMeal(true);
    setEditingMealIndex(index);
  };

  const removeMeal = (index) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("اسم البرنامج مطلوب");
      return;
    }

    if (calories <= 0) {
      setError("يجب أن تكون السعرات الحرارية رقمًا موجبًا");
      return;
    }

    // Ensure any unsubmitted meal is added before submission
    if (mealName || ingredients.some((ing) => ing.ingredient && ing.quantity)) {
      addOrUpdateMeal();
    }

    setIsSubmitting(true);
    try {
      // Use updated state to submit the form
      await saveDailyProgram({
        name,
        exercises: exercises.length > 0 ? exercises.map((e) => e._id) : [],
        meals,
        calories,
      });
      close();
    } catch (error) {
      setError("فشل في حفظ البرنامج اليومي");
    } finally {
      setIsSubmitting(false);
    }
  };

  const close = () => {
    resetForm();
    closeModal();
  };

  return (
    <Modal title="البرنامج اليومي" isOpen={isOpen} closeModal={close}>
      <form onSubmit={handleSubmit} className="gap-y-4 max-w-2xl">
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
            <Select
              isMulti
              options={allExercises}
              onChange={handleExerciseChange}
              value={exercises.map((ex) => ({ value: ex._id, label: ex.name }))}
              className="mt-1"
              placeholder="اختر التمارين"
            />
            <div className="mt-2 flex gap-x-1 gap-y-2 flex-wrap">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-indigo-100 text-indigo-700 flex justify-between items-center px-2 py-1 rounded w-fit"
                >
                  <span>{exercise.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setExercises(exercises.filter((_, i) => i !== index))
                    }
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
          {meals.map((meal, mealIndex) => (
            <div key={mealIndex} className="mb-4">
              <div className="flex items-center gap-x-2">
                <span className="font-semibold text-gray-700">
                  وجبة {meal.name}
                </span>
                <button
                  type="button"
                  onClick={() => editMeal(mealIndex)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={() => removeMeal(mealIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="mt-2 flex gap-x-1 flex-wrap">
                {meal.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-indigo-100 text-indigo-700 flex justify-between items-center px-2 py-1 rounded w-fit mb-2"
                  >
                    <span>
                      {ingredient.ingredient} ({ingredient.quantity})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700">
              {isEditingMeal ? "تعديل الوجبة" : "إضافة وجبة جديدة"}
            </h4>
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="p-2 mb-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              placeholder="اسم الوجبة"
            />
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-x-2 mb-2">
                <input
                  type="text"
                  value={ingredient.ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, "ingredient", e.target.value)
                  }
                  className="p-2 flex-grow shadow-sm sm:text-sm border border-indigo-500 rounded-md"
                  placeholder="اسم المكون"
                />
                <input
                  type="text"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  className="p-2 flex-grow shadow-sm sm:text-sm border border-indigo-500 rounded-md"
                  placeholder="الكمية"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              إضافة مكون
            </button>
            <button
              type="button"
              onClick={addOrUpdateMeal}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              {isEditingMeal ? "تحديث الوجبة" : "إضافة وجبة"}
            </button>
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
