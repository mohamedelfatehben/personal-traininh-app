import { useState, useEffect, useCallback } from "react";
import { getAllTraineesApi } from "../../api/users";
import { getPlansApi } from "../../api/plans";
import { FaCheckCircle, FaTimesCircle, FaEye, FaClock } from "react-icons/fa";
import Layout from "../../components/Layout";
import UserModal from "../../components/trainer/UserModal";
import NextPaymentModal from "../../components/trainer/NextPaymentModal";
import ProgramModal from "../../components/trainer/ProgramModal";
import Pagination from "../../components/common/Pagination";
import { useSelector } from "react-redux";
import Excerpted from "../../components/common/Excerepted";

const TrainerDashboard = () => {
  const user = useSelector((state) => state.authReducer);
  const [trainees, setTrainees] = useState([]);
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterNextPaymentStatus, setFilterNextPaymentStatus] = useState("");
  const [filterPlan, setFilterPlan] = useState("");

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchTrainees = async () => {
    try {
      const data = await getAllTraineesApi(
        page,
        10,
        user.token,
        searchText,
        filterStatus,
        filterNextPaymentStatus,
        filterPlan
      );
      setTrainees(data.data.trainees);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error("Error fetching trainees", error);
    }
  };

  const fetchPlans = async () => {
    try {
      const data = await getPlansApi(user.token);
      setPlans(data.data);
    } catch (error) {
      console.error("Error fetching plans", error);
    }
  };

  const debouncedFetchTrainees = useCallback(debounce(fetchTrainees, 500), [
    searchText,
    filterStatus,
    filterNextPaymentStatus,
    filterPlan,
  ]);

  useEffect(() => {
    if (user.token) {
      fetchPlans();
    }
  }, [user.token]);

  useEffect(() => {
    if (searchText.length >= 3 || searchText.length === 0) {
      debouncedFetchTrainees();
    }
  }, [
    searchText,
    filterStatus,
    filterNextPaymentStatus,
    filterPlan,
    debouncedFetchTrainees,
  ]);

  useEffect(() => {
    if (user.token) fetchTrainees();
  }, [page, user.token]);

  const openUserModal = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setSelectedUser(null);
    setIsUserModalOpen(false);
  };

  const openPaymentModal = (payment) => {
    setSelectedPayment(payment);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setSelectedPayment(null);
    setIsPaymentModalOpen(false);
  };

  const openProgramModal = (user) => {
    setSelectedUser(user);
    setIsProgramModalOpen(true);
  };

  const closeProgramModal = () => {
    setSelectedUser(null);
    setIsProgramModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleProgramSave = (program) => {
    const updatedUser = { ...selectedUser, program };
    const updatedTrainees = trainees.map((trainee) =>
      trainee._id === updatedUser._id ? updatedUser : trainee
    );
    setTrainees(updatedTrainees);
    closeProgramModal();
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 bg-gray-100 w-screen">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-indigo-700">
          Trainer Dashboard
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
            Summary of All Clients
          </h3>
          <div className="flex flex-col md:flex-row flex-wrap mb-4 gap-y-2 md:gap-x-4">
            <input
              type="text"
              placeholder="Search by name (write three letters or more)"
              className="border p-2 rounded flex-grow"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select
              className="border p-2 rounded"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Current Payment Status</option>
              <option value="active">Active</option>
              <option value="ended">Ended</option>
            </select>
            <select
              className="border p-2 rounded"
              value={filterNextPaymentStatus}
              onChange={(e) => setFilterNextPaymentStatus(e.target.value)}
            >
              <option value="">Next Payment Status</option>
              <option value="pending">Pending</option>
              <option value="denied">Denied</option>
            </select>
            <select
              className="border p-2 rounded"
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
            >
              <option value="">All Plans</option>
              {plans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-nowrap">Name</th>
                  <th className="py-2 px-4 border-b text-nowrap">Email</th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    Current Plan
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    Subscription End
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    Current Payment Status
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    Next Payment Status
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">Program</th>
                  <th className="py-2 px-4 border-b text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainees.map((trainee) => (
                  <tr key={trainee._id}>
                    <td className="py-2 px-4 border-b">{trainee.name}</td>
                    <td className="py-2 px-4 border-b">{trainee.email}</td>
                    <td className="py-2 px-4 border-b text-nowrap">
                      {trainee.currentPlan ? (
                        <Excerpted
                          text={trainee.currentPlan.name}
                          length={16}
                          bottom={true}
                        />
                      ) : (
                        "No Plan"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {trainee.subscriptionEnd
                        ? new Date(trainee.subscriptionEnd).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {!trainee.subscriptionEnd ? (
                        "No payment"
                      ) : new Date(trainee.subscriptionEnd) > new Date() ? (
                        <span className="text-green-500 flex items-center">
                          <FaCheckCircle className="mr-2" /> Active
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <FaTimesCircle className="mr-2" /> Ended
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {trainee.nextPayment ? (
                        trainee.nextPayment.status === "pending" ? (
                          <button
                            onClick={() =>
                              openPaymentModal(trainee.nextPayment)
                            }
                            className="text-yellow-500 flex items-center"
                          >
                            <FaClock className="mr-2" /> Pending
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              openPaymentModal(trainee.nextPayment)
                            }
                            className="text-red-500 flex items-center"
                          >
                            <FaTimesCircle className="mr-2" /> Denied
                          </button>
                        )
                      ) : (
                        <span className="text-gray-500">No Payment</span>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {trainee.program ? (
                        <button
                          className="text-indigo-600 hover:text-indigo-800 flex items-center"
                          onClick={() => openProgramModal(trainee)}
                        >
                          {trainee.program.name}
                        </button>
                      ) : (
                        <button
                          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 text-nowrap"
                          onClick={() => openProgramModal(trainee)}
                        >
                          Assign Program
                        </button>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 flex items-center mr-4"
                        onClick={() => openUserModal(trainee)}
                      >
                        <FaEye className="mr-2" /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <UserModal
        isOpen={isUserModalOpen}
        closeModal={closeUserModal}
        user={selectedUser}
      />
      <NextPaymentModal
        isOpen={isPaymentModalOpen}
        closeModal={closePaymentModal}
        payment={selectedPayment}
        token={user.token}
        onUpdate={(trainee) => {
          const index = trainees.findIndex((t) => trainee._id === t._id);
          let newTrainees = [...trainees];
          newTrainees[index] = { ...trainee };
          setTrainees([...newTrainees]);
        }}
      />
      <ProgramModal
        isOpen={isProgramModalOpen}
        closeModal={closeProgramModal}
        user={selectedUser}
        onSave={handleProgramSave}
      />
    </Layout>
  );
};

export default TrainerDashboard;
