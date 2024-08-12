/* eslint-disable react/prop-types */
import Modal from "../common/Modal";
import { Button } from "@headlessui/react";
import { useState } from "react";
import { FaMale, FaFemale, FaArrowLeft, FaPlus, FaTimes } from "react-icons/fa"; // Import icons from react-icons
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux
import { updateUserApi } from "../../api/auth"; // Import the update user API function
import { setUserInfo } from "../../redux/user";

export default function MultiStepModal({ isOpen, closeModal }) {
  const user = useSelector((state) => state.authReducer);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    trainingFrequency: "",
    foodAllergies: [],
    budget: "",
    fitnessGoals: "",
  });
  const [errors, setErrors] = useState({});
  const [allergyInput, setAllergyInput] = useState("");

  const dispatch = useDispatch(); // Initialize useDispatch

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on change
  };

  const handleAddAllergy = () => {
    if (allergyInput.trim()) {
      setFormData({
        ...formData,
        foodAllergies: [...formData.foodAllergies, allergyInput.trim()],
      });
      setAllergyInput("");
    }
  };

  const handleRemoveAllergy = (index) => {
    const newAllergies = formData.foodAllergies.filter((_, i) => i !== index);
    setFormData({ ...formData, foodAllergies: newAllergies });
  };

  const validateStep = () => {
    let stepErrors = {};
    if (step === 1 && !formData.gender) stepErrors.gender = "الجنس مطلوب";
    if (step === 2) {
      if (!formData.age) stepErrors.age = "العمر مطلوب";
      if (!formData.height) stepErrors.height = "الطول مطلوب";
      if (!formData.weight) stepErrors.weight = "الوزن مطلوب";
    }
    if (step === 3) {
      if (!formData.trainingFrequency)
        stepErrors.trainingFrequency = "تردد التدريب مطلوب";
      if (!formData.budget) stepErrors.budget = "الميزانية مطلوبة";
      if (!formData.fitnessGoals)
        stepErrors.fitnessGoals = "أهداف اللياقة البدنية مطلوبة";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        const token = window.localStorage.getItem("token");
        await updateUserApi(token, formData);
        dispatch(setUserInfo({ ...user, ...formData })); // Dispatch the action to update Redux store
        closeModal();
      } catch (error) {
        console.error("Failed to update user data", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title={"أكمل معلوماتك"}>
      <div className="mt-4">
        {step > 1 && (
          <button
            type="button"
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
            onClick={handleBack}
          >
            <FaArrowLeft size={20} />
          </button>
        )}
        {step === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              الجنس
            </label>
            <div className="mt-1 flex space-x-4">
              <button
                type="button"
                className={`flex-1 py-4 px-4 border rounded-md ${
                  formData.gender === "male"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                } flex items-center justify-center`}
                onClick={() => setFormData({ ...formData, gender: "male" })}
              >
                <FaMale className="mr-2" size={24} />
                ذكر
              </button>
              <button
                type="button"
                className={`flex-1 py-4 px-4 border rounded-md ${
                  formData.gender === "female"
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                } flex items-center justify-center`}
                onClick={() => setFormData({ ...formData, gender: "female" })}
              >
                <FaFemale className="mr-2" size={24} />
                أنثى
              </button>
            </div>
            {errors.gender && (
              <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
            )}
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                className="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
                onClick={closeModal}
              >
                إلغاء
              </Button>
              <Button
                className={`rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 ${
                  !formData.gender ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleNext}
                disabled={!formData.gender}
              >
                التالي
              </Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              العمر (يجب أن يكون أكبر من 18)
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.age && (
              <p className="mt-2 text-sm text-red-600">{errors.age}</p>
            )}
            <label className="block text-sm font-medium text-gray-700 mt-4">
              الطول (سم)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                errors.height ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.height && (
              <p className="mt-2 text-sm text-red-600">{errors.height}</p>
            )}
            <label className="block text-sm font-medium text-gray-700 mt-4">
              الوزن (كجم)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                errors.weight ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.weight && (
              <p className="mt-2 text-sm text-red-600">{errors.weight}</p>
            )}
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                className="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
                onClick={closeModal}
              >
                إلغاء
              </Button>
              <Button
                className={`rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 ${
                  !formData.age || !formData.height || !formData.weight
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleNext}
                disabled={!formData.age || !formData.height || !formData.weight}
              >
                التالي
              </Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              تردد التدريب
            </label>
            <div className="mt-1 flex space-x-4">
              <button
                type="button"
                className={`flex-1 py-4 px-4 border rounded-md ${
                  formData.trainingFrequency === "low"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                } flex items-center justify-center`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    trainingFrequency: "low",
                  })
                }
              >
                2 أيام (منخفض)
              </button>
              <button
                type="button"
                className={`flex-1 py-4 px-4 border rounded-md ${
                  formData.trainingFrequency === "medium"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                } flex items-center justify-center`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    trainingFrequency: "medium",
                  })
                }
              >
                3-4 أيام (متوسط)
              </button>
              <button
                type="button"
                className={`flex-1 py-4 px-4 border rounded-md ${
                  formData.trainingFrequency === "high"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                } flex items-center justify-center`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    trainingFrequency: "high",
                  })
                }
              >
                5 أيام (عالي)
              </button>
            </div>
            {errors.trainingFrequency && (
              <p className="mt-2 text-sm text-red-600">
                {errors.trainingFrequency}
              </p>
            )}
            <label className="block text-sm font-medium text-gray-700 mt-4">
              الحساسية الغذائية
            </label>
            <div className="flex space-x-2 items-center">
              <input
                type="text"
                name="foodAllergies"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors.foodAllergies ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                className="rounded-md bg-indigo-600 py-2 px-3 text-white"
                onClick={handleAddAllergy}
              >
                <FaPlus />
              </button>
            </div>
            {errors.foodAllergies && (
              <p className="mt-2 text-sm text-red-600">
                {errors.foodAllergies}
              </p>
            )}
            <div className="mt-2">
              {formData.foodAllergies.map((allergy, index) => (
                <div
                  key={index}
                  className="inline-flex items-center bg-indigo-600 text-white rounded-md py-1 px-3 m-1"
                >
                  {allergy}
                  <button
                    type="button"
                    className="ml-2 text-red-600"
                    onClick={() => handleRemoveAllergy(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              الميزانية (DA)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                errors.budget ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.budget && (
              <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
            )}
            <label className="block text-sm font-medium text-gray-700 mt-4">
              أهداف اللياقة البدنية
            </label>
            <select
              name="fitnessGoals"
              value={formData.fitnessGoals}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                errors.fitnessGoals ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">اختر أهداف اللياقة البدنية</option>
              <option value="weight_loss">فقدان الوزن</option>
              <option value="muscle_gain">زيادة العضلات</option>
              <option value="endurance">القدرة على التحمل</option>
              <option value="flexibility">المرونة</option>
            </select>
            {errors.fitnessGoals && (
              <p className="mt-2 text-sm text-red-600">{errors.fitnessGoals}</p>
            )}
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                className="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
                onClick={closeModal}
              >
                إلغاء
              </Button>
              <Button
                className={`rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 ${
                  !formData.trainingFrequency ||
                  !formData.budget ||
                  !formData.fitnessGoals
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleSubmit}
                disabled={
                  !formData.trainingFrequency ||
                  !formData.budget ||
                  !formData.fitnessGoals
                }
              >
                إرسال
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
