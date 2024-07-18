import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { FaMale, FaFemale, FaArrowLeft, FaPlus, FaTimes } from "react-icons/fa"; // Import icons from react-icons
import { updateUserApi } from "../../api/auth"; // Import the update user API function

export default function MultiStepModal({
  isOpen,
  closeModal,
  mustCompleteInfo,
}) {
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
    plan: "",
  });
  const [errors, setErrors] = useState({});
  const [allergyInput, setAllergyInput] = useState("");

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
    if (step === 1 && !formData.gender)
      stepErrors.gender = "Gender is required";
    if (step === 2) {
      if (!formData.age) stepErrors.age = "Age is required";
      if (!formData.height) stepErrors.height = "Height is required";
      if (!formData.weight) stepErrors.weight = "Weight is required";
    }
    if (step === 3) {
      if (!formData.trainingFrequency)
        stepErrors.trainingFrequency = "Training frequency is required";
      if (!formData.budget) stepErrors.budget = "Budget is required";
      if (!formData.fitnessGoals)
        stepErrors.fitnessGoals = "Fitness goals are required";
    }
    if (step === 4 && !formData.plan) stepErrors.plan = "Plan is required";
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        const token = window.localStorage.getItem("token");
        await updateUserApi(token, formData);
        closeModal();
      } catch (error) {
        console.error("Failed to update user data", error);
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10"
      onClose={mustCompleteInfo ? () => {} : closeModal}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow-xl relative">
            <DialogTitle
              as="h3"
              className="text-lg font-bold text-gray-900 text-center"
            >
              Complete Your Profile
            </DialogTitle>
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
                    Gender
                  </label>
                  <div className="mt-1 flex space-x-4">
                    <button
                      type="button"
                      className={`flex-1 py-4 px-4 border rounded-md ${
                        formData.gender === "male"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 border-gray-300"
                      } flex items-center justify-center`}
                      onClick={() =>
                        setFormData({ ...formData, gender: "male" })
                      }
                    >
                      <FaMale className="mr-2" size={24} />
                      Male
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-4 px-4 border rounded-md ${
                        formData.gender === "female"
                          ? "bg-pink-600 text-white"
                          : "bg-white text-gray-700 border-gray-300"
                      } flex items-center justify-center`}
                      onClick={() =>
                        setFormData({ ...formData, gender: "female" })
                      }
                    >
                      <FaFemale className="mr-2" size={24} />
                      Female
                    </button>
                  </div>
                  {errors.gender && (
                    <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
                  )}
                  <div className="mt-8 flex justify-end space-x-4">
                    {!mustCompleteInfo && (
                      <Button
                        className="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      className={`rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 ${
                        !formData.gender ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleNext}
                      disabled={!formData.gender}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age (Must be over 18)
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
                    Height (cm)
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
                    Weight (kg)
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
                    {!mustCompleteInfo && (
                      <Button
                        className="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      className={`rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 ${
                        !formData.age || !formData.height || !formData.weight
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={handleNext}
                      disabled={
                        !formData.age || !formData.height || !formData.weight
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Training Frequency
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
                      2 days (Low)
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
                      3-4 days (Medium)
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
                      5 days (High)
                    </button>
                  </div>
                  {errors.trainingFrequency && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.trainingFrequency}
                    </p>
                  )}
                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Food Allergies
                  </label>
                  <div className="flex space-x-2 items-center">
                    <input
                      type="text"
                      name="foodAllergies"
                      value={allergyInput}
                      onChange={(e) => setAllergyInput(e.target.value)}
                      className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                        errors.foodAllergies
                          ? "border-red-500"
                          : "border-gray-300"
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
                    Budget (DA)
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
                    Fitness Goals
                  </label>
                  <select
                    name="fitnessGoals"
                    value={formData.fitnessGoals}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors.fitnessGoals ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select fitness goals</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="endurance">Endurance</option>
                    <option value="flexibility">Flexibility</option>
                  </select>
                  {errors.fitnessGoals && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.fitnessGoals}
                    </p>
                  )}
                  <div className="mt-8 flex justify-end space-x-4">
                    {!mustCompleteInfo && (
                      <Button
                        className="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      className={`rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 ${
                        !formData.trainingFrequency ||
                        !formData.budget ||
                        !formData.fitnessGoals
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={handleNext}
                      disabled={
                        !formData.trainingFrequency ||
                        !formData.budget ||
                        !formData.fitnessGoals
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Choose a Plan
                  </label>
                  <div className="mt-1 flex space-x-4">
                    <div
                      className={`flex-1 py-4 px-4 border rounded-md cursor-pointer ${
                        formData.plan === "exercise"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, plan: "exercise" })
                      }
                    >
                      <h3 className="text-lg font-bold">Exercise Only</h3>
                      <p className="mt-2 text-sm">Price: 1000 DA</p>
                      <p className="text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Incidunt ullam sed qui iure dicta eius sint in quaerat
                      </p>
                    </div>
                    <div
                      className={`flex-1 py-4 px-4 border rounded-md cursor-pointer ${
                        formData.plan === "exercise_nutrition"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          plan: "exercise_nutrition",
                        })
                      }
                    >
                      <h3 className="text-lg font-bold">
                        Exercise & Nutrition
                      </h3>
                      <p className="mt-2 text-sm">Price: 2000 DA</p>
                      <p className="text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Incidunt ullam sed qui iure dicta eius sint in quaerat
                      </p>
                    </div>
                  </div>
                  {errors.plan && (
                    <p className="mt-2 text-sm text-red-600">{errors.plan}</p>
                  )}
                  <div className="mt-8 flex justify-end space-x-4">
                    {!mustCompleteInfo && (
                      <Button
                        className="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      className="rounded-md bg-gray-300 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-400"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      className={`rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 ${
                        !formData.plan ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleSubmit}
                      disabled={!formData.plan}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
