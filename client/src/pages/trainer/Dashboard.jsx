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
          لوحة المدرب
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-4 md:mb-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
            ملخص جميع العملاء
          </h3>
          <div className="flex flex-col md:flex-row flex-wrap mb-4 gap-y-2 md:gap-x-4">
            <input
              type="text"
              placeholder="ابحث بالاسم (اكتب ثلاثة أحرف أو أكثر)"
              className="border p-2 rounded flex-grow"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select
              className="border p-2 rounded"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">حالة الدفع الحالية</option>
              <option value="active">نشط</option>
              <option value="ended">منتهي</option>
            </select>
            <select
              className="border p-2 rounded"
              value={filterNextPaymentStatus}
              onChange={(e) => setFilterNextPaymentStatus(e.target.value)}
            >
              <option value="">حالة الدفع القادمة</option>
              <option value="pending">معلق</option>
              <option value="denied">مرفوض</option>
            </select>
            <select
              className="border p-2 rounded"
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
            >
              <option value="">جميع الخطط</option>
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
                  <th className="py-2 px-4 border-b text-nowrap">الاسم</th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    البريد الإلكتروني
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">رقم الهاتف</th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    الخطة الحالية
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    نهاية الاشتراك
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    حالة الدفع الحالية
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    حالة الدفع القادمة
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">البرنامج</th>
                  <th className="py-2 px-4 border-b text-nowrap">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {trainees.map((trainee) => (
                  <tr key={trainee._id}>
                    <td className="py-2 px-4 border-b">{trainee.name}</td>
                    <td className="py-2 px-4 border-b">{trainee.email}</td>
                    <td className="py-2 px-4 border-b">
                      {trainee.phoneNumber}
                    </td>{" "}
                    {/* Display phone number */}
                    <td className="py-2 px-4 border-b text-nowrap">
                      {trainee.currentPlan ? (
                        <Excerpted
                          text={trainee.currentPlan.name}
                          length={16}
                          bottom={true}
                        />
                      ) : (
                        "لا توجد خطة"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {trainee.subscriptionEnd
                        ? new Date(trainee.subscriptionEnd).toLocaleDateString()
                        : "غير متاح"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {!trainee.subscriptionEnd ? (
                        "لا يوجد دفع"
                      ) : new Date(trainee.subscriptionEnd) > new Date() ? (
                        <span className="text-green-500 flex items-center">
                          <FaCheckCircle className="mr-2" /> نشط
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <FaTimesCircle className="mr-2" /> منتهي
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
                            <FaClock className="mr-2" /> معلق
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              openPaymentModal(trainee.nextPayment)
                            }
                            className="text-red-500 flex items-center"
                          >
                            <FaTimesCircle className="mr-2" /> مرفوض
                          </button>
                        )
                      ) : (
                        <span className="text-gray-500">لا يوجد دفع</span>
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
                          تعيين برنامج
                        </button>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-indigo-600 hover:text-indigo-800 flex items-center mr-4"
                        onClick={() => openUserModal(trainee)}
                      >
                        <FaEye className="mr-2" /> التفاصيل
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
