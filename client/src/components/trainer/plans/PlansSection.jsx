import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCalendarDay, FaPlus } from "react-icons/fa";
import PlanModal from "./PlanModal";
import Pagination from "../../common/Pagination";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
  createPlanApi,
  deletePlanApi,
  getPlansApi,
  updatePlanApi,
} from "../../../api/plans";
import Layout from "../../Layout";
import { useSelector } from "react-redux";
import Excerpted from "../../common/Excerepted";

const PlansSection = () => {
  const user = useSelector((state) => state.authReducer);
  console.log(user);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [planToDelete, setPlanToDelete] = useState(null);

  useEffect(() => {
    if (user.token) {
      fetchPlans(currentPage);
    }
  }, [currentPage]);

  const fetchPlans = async () => {
    setIsLoading(true);
    const { data } = await getPlansApi(user.token);
    console.log(data);
    setPlans(data);
    setTotalPages(data.totalPages);
    setIsLoading(false);
  };

  const handleSavePlan = async (plan) => {
    if (currentPlan) {
      await updatePlanApi(currentPlan._id, plan, user.token);
    } else {
      await createPlanApi(plan, user.token);
    }
    fetchPlans(currentPage);
    setIsPlanModalOpen(false);
    setCurrentPlan(null);
  };

  const openPlanModal = (plan = null) => {
    setCurrentPlan(plan);
    setIsPlanModalOpen(true);
  };

  const closePlanModal = () => {
    setCurrentPlan(null);
    setIsPlanModalOpen(false);
  };

  const openConfirmationModal = (plan) => {
    setPlanToDelete(plan);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setPlanToDelete(null);
    setIsConfirmationModalOpen(false);
  };

  const handleDelete = async () => {
    await deletePlanApi(planToDelete._id, user.token);
    fetchPlans(currentPage);
    closeConfirmationModal();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 bg-gray-100">
        <div className="bg-white shadow-lg w-full rounded-lg p-4 md:p-6 mb-4 md:mb-8">
          <div className="flex items-center mb-4">
            <FaCalendarDay className="text-indigo-600 text-2xl mr-2" />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
              Manage Plans
            </h3>
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-800 flex items-center ml-auto"
              onClick={() => openPlanModal()}
            >
              <FaPlus className="mr-2" /> Add Plan
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Name</th>
                    <th className="py-2 px-4 border-b text-left">Type</th>
                    <th className="py-2 px-4 border-b text-left">
                      Description
                    </th>
                    <th className="py-2 px-4 border-b text-left">Price</th>
                    <th className="py-2 px-4 border-b text-left">
                      Payment Type
                    </th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans?.map((plan) => (
                    <tr key={plan._id}>
                      <td className="py-2 px-4 border-b">
                        <Excerpted text={plan.name} length={14} bottom={true} />{" "}
                      </td>
                      <td className="py-2 px-4 border-b">{plan.type}</td>
                      <td className="py-2 px-4 border-b">{plan.description}</td>
                      <td className="py-2 px-4 border-b">{plan.price} DA</td>
                      <td className="py-2 px-4 border-b">{plan.paymentType}</td>
                      <td className="py-2 px-4 border-b flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => openPlanModal(plan)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => openConfirmationModal(plan)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          <PlanModal
            isOpen={isPlanModalOpen}
            closeModal={closePlanModal}
            savePlan={handleSavePlan}
            plan={currentPlan}
          />
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            title="Delete Plan"
            message={`Do you want to delete ${planToDelete?.name}?`}
            onConfirm={handleDelete}
            onCancel={closeConfirmationModal}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PlansSection;
