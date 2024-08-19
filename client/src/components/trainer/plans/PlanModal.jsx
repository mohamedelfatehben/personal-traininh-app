/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "../../common/Modal";

const PlanModal = ({ isOpen, closeModal, savePlan, plan }) => {
  const [name, setName] = useState(plan ? plan.name : "");
  const [type, setType] = useState(plan ? plan.type : "exercise");
  const [description, setDescription] = useState(plan ? plan.description : "");
  const [price, setPrice] = useState(plan ? plan.price : 0);
  const [paymentType, setPaymentType] = useState(
    plan ? plan.paymentType : "monthly"
  );
  const [days, setDays] = useState(
    plan && plan.paymentType === "by day" ? plan.days : 0
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setType(plan.type);
      setDescription(plan.description);
      setPrice(plan.price);
      setPaymentType(plan.paymentType);
      setDays(plan.paymentType === "by day" ? plan.days : 0);
    } else {
      setName("");
      setType("exercise");
      setDescription("");
      setPrice(0);
      setPaymentType("monthly");
      setDays(0);
    }
  }, [plan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await savePlan({
      name,
      type,
      description,
      price,
      paymentType,
      days: +days,
    });
    setIsSubmitting(false);
    closeModal();
  };

  return (
    <Modal title="الخطة" isOpen={isOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit} className="gap-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              الاسم
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              النوع
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              required
            >
              <option value="exercise">تمرين</option>
              <option value="nutrition">تغذية</option>
              <option value="exercise and nutrition">تمرين وتغذية</option>
            </select>
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              الوصف
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              السعر
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              نوع الدفع
            </label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              required
            >
              <option value="monthly">شهري</option>
              <option value="by day">حسب اليوم</option>
            </select>
          </div>
          {paymentType === "by day" && (
            <div>
              <label className="block text-sm sm:text-base font-semibold text-indigo-700">
                عدد الأيام
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
                required
              />
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-x-4">
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
            {isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PlanModal;
