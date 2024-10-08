import { useState, useEffect } from "react";
import { getPlansApi } from "../../api/plans";
import PaymentModal from "./PaymentModal";
import { FaMoneyBillWave, FaInfoCircle, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const PlanSelection = () => {
  const user = useSelector((state) => state.authReducer);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlansApi(user.token);
        setPlans(response.data);
      } catch (error) {
        console.error("فشل في جلب الخطط", error);
      }
    };
    if (user.token) {
      fetchPlans();
    }
  }, [user.token]);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setOpenPaymentModal(true);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
        الخطط المتاحة
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="border rounded-lg p-6 hover:bg-indigo-100 transition duration-300 ease-in-out"
          >
            <h4 className="text-xl font-bold text-gray-800">{plan.name}</h4>
            <p className="flex items-center text-indigo-600 mt-2">
              <FaMoneyBillWave className="mr-1" /> {plan.price} دج
            </p>
            <p className="mt-4 text-gray-600 flex items-center">
              <FaInfoCircle className="mr-2 text-indigo-600" />{" "}
              {plan.description}
            </p>
            <p className="mt-4 text-gray-600 flex items-center">
              <FaInfoCircle className="mr-2 text-indigo-600" /> نوع الدفع:{" "}
              {plan.paymentType}
            </p>
            {plan.paymentType === "by day" && (
              <p className="mt-4 text-gray-600 flex items-center">
                <FaInfoCircle className="mr-2 text-indigo-600" /> عدد الأيام:{" "}
                {plan.days}
              </p>
            )}
            <button
              className="mt-4 flex items-center justify-end text-indigo-600 hover:text-indigo-800"
              onClick={() => handlePlanSelection(plan)}
            >
              اختر الخطة <FaArrowRight className="ml-2" />
            </button>
          </div>
        ))}
      </div>
      {openPaymentModal && selectedPlan && (
        <PaymentModal
          isOpen={openPaymentModal}
          closeModal={() => setOpenPaymentModal(false)}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default PlanSelection;
