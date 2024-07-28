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
    <Modal title="Plan" isOpen={isOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit} className="gap-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              Name
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
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              required
            >
              <option value="exercise">Exercise</option>
              <option value="exercise and nutrition">
                Exercise and Nutrition
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-indigo-700">
              Description
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
              Price
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
              Payment Type
            </label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-indigo-500 rounded-md"
              required
            >
              <option value="monthly">Monthly</option>
              <option value="by day">By Day</option>
            </select>
          </div>
          {paymentType === "by day" && (
            <div>
              <label className="block text-sm sm:text-base font-semibold text-indigo-700">
                Number of Days
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
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PlanModal;
