import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSave,
  FaUser,
  FaRulerVertical,
  FaWeight,
  FaDumbbell,
  FaUtensils,
  FaDollarSign,
  FaPlus,
  FaTimes,
  FaPhone,
} from "react-icons/fa";
import { updateUserApi } from "../../api/auth"; // Import the update user API function
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout";
import { updateUserInfo } from "../../redux/user";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer);
  const [formData, setFormData] = useState({
    age: user.age || "",
    height: user.height || "",
    weight: user.weight || "",
    fitnessGoals: user.fitnessGoals || "",
    trainingFrequency: user.trainingFrequency || "",
    foodAllergies: user.foodAllergies || [],
    budget: user.budget || "",
    phoneNumber: user.phoneNumber || "", // Add phone number to formData
  });
  const [allergyInput, setAllergyInput] = useState("");
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let formErrors = {};
    if (!formData.age) formErrors.age = "العمر مطلوب";
    if (!formData.height) formErrors.height = "الطول مطلوب";
    if (!formData.weight) formErrors.weight = "الوزن مطلوب";
    if (!formData.trainingFrequency)
      formErrors.trainingFrequency = "مطلوب تكرار التدريب";
    if (!formData.budget) formErrors.budget = "الميزانية مطلوبة";
    if (!formData.fitnessGoals)
      formErrors.fitnessGoals = "أهداف اللياقة مطلوبة";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = window.localStorage.getItem("token");
        await updateUserApi(token, formData);
        toast.success("تم تحديث الملف الشخصي بنجاح!");
        // Dispatch the updateUserInfo action
        dispatch(updateUserInfo(formData));
      } catch (error) {
        toast.error("فشل في تحديث الملف الشخصي!");
        console.error("Failed to update user data", error);
      }
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <ToastContainer />
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          صفحة الملف الشخصي
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <FaUser className="text-indigo-500 mr-2" />
              <div className="w-full">
                <label className="block text-lg font-bold text-indigo-700">
                  العمر
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="العمر"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.age && (
                  <p className="mt-2 text-sm text-red-600">{errors.age}</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <FaRulerVertical className="text-indigo-500 mr-2" />
              <div className="w-full">
                <label className="block text-lg font-bold text-indigo-700">
                  الطول (سم)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="الطول (سم)"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.height && (
                  <p className="mt-2 text-sm text-red-600">{errors.height}</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <FaWeight className="text-indigo-500 mr-2" />
              <div className="w-full">
                <label className="block text-lg font-bold text-indigo-700">
                  الوزن (كغ)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="الوزن (كغ)"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.weight && (
                  <p className="mt-2 text-sm text-red-600">{errors.weight}</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <FaDumbbell className="text-indigo-500 mr-2" />
              <div className="w-full">
                <label className="block text-lg font-bold text-indigo-700">
                  أهداف اللياقة
                </label>
                <select
                  name="fitnessGoals"
                  value={formData.fitnessGoals}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">اختر أهداف اللياقة</option>
                  <option value="weight_loss">فقدان الوزن</option>
                  <option value="muscle_gain">زيادة العضلات</option>
                  <option value="endurance">التحمل</option>
                  <option value="flexibility">المرونة</option>
                </select>
                {errors.fitnessGoals && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.fitnessGoals}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <FaDumbbell className="text-indigo-500 mr-2" />
              <div className="w-full">
                <label className="block text-lg font-bold text-indigo-700">
                  تكرار التدريب
                </label>
                <select
                  name="trainingFrequency"
                  value={formData.trainingFrequency}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">اختر تكرار التدريب</option>
                  <option value="low">يومان (منخفض)</option>
                  <option value="medium">3-4 أيام (متوسط)</option>
                  <option value="high">5 أيام (عالي)</option>
                </select>
                {errors.trainingFrequency && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.trainingFrequency}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <FaUtensils className="text-indigo-500 mr-2" />
              <div className="w-full">
                <label className="block text-lg font-bold text-indigo-700">
                  الحساسيات الغذائية
                </label>
                <div className="flex space-x-2 items-center">
                  <input
                    type="text"
                    name="foodAllergies"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 py-2 px-3 text-white"
                    onClick={handleAddAllergy}
                  >
                    <FaPlus />
                  </button>
                </div>
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
              </div>
            </div>
            <div className="flex items-center">
              <FaDollarSign className="text-indigo-500 mr-2" />
              <div className="w-full">
                <label className="block text-lg font-bold text-indigo-700">
                  الميزانية (DA)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="الميزانية (DA)"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.budget && (
                  <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-indigo-500 mr-2" />
              <div className="w-full">
                <label className="block text-lg font-bold text-indigo-700">
                  رقم الهاتف
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="رقم الهاتف"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-4 flex items-center justify-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <FaSave className="mr-2" />
              حفظ
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProfilePage;
