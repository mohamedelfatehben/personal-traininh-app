import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import { getUserApi } from "./api/auth";
import { logoutUser, setUserInfo } from "./redux/user";
import MultiStepModal from "./components/trainee/MultiStepForm";
import ProfilePage from "./pages/trainee/ProfilePage";
import ClientDashboard from "./pages/trainee/Dashboard";
import AdminDashboard from "./pages/trainer/Dashboard";
import Programs from "./pages/trainer/Programs";
import PlansSection from "./components/trainer/plans/PlansSection";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/trainee/ForgotPassword";
import ResetPassword from "./pages/trainee/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer);
  const [openDataModel, setOpenDataModel] = useState(false);
  const [mustCompleteInfo, setMustCompleteInfo] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await getUserApi(token);
          const userData = response.data;
          dispatch(
            setUserInfo({
              id: userData.id,
              name: userData.name,
              role: userData.role,
              age: userData.age,
              height: userData.height,
              weight: userData.weight,
              budget: userData.budget,
              trainingFrequency: userData.trainingFrequency,
              foodAllergies:
                userData.foodAllergies?.length > 0
                  ? [...userData.foodAllergies]
                  : [],
              fitnessGoals: userData.fitnessGoals,
              plan: userData.currentPlan || null,
              subscriptionEnd: userData.subscriptionEnd || "",
              nextPayment: userData.nextPayment ? userData.nextPayment : null,
              program: userData.program ? userData.program : null,
              phoneNumber: userData.phoneNumber ? userData.phoneNumber : "",
            })
          );
          if (!userData.nextPayment) {
            window.localStorage.setItem("nextPayment", "");
          }
          if (
            userData.role === "trainee" &&
            (!userData.age ||
              !userData.height ||
              !userData.weight ||
              !userData.trainingFrequency ||
              !userData.budget ||
              !userData.fitnessGoals ||
              !userData.gender)
          ) {
            setOpenDataModel(true);
            setMustCompleteInfo(true);
          }
        }
      } catch (error) {
        window.localStorage.clear();
        dispatch(logoutUser());
        window.location("/");
      }
    };

    fetchUserData();
  }, [user.token, dispatch]);
  console.log(user);
  return (
    <BrowserRouter>
      {openDataModel && (
        <MultiStepModal
          isOpen={openDataModel}
          closeModal={() => {
            setMustCompleteInfo(false);
            setOpenDataModel(false);
          }}
          mustCompleteInfo={mustCompleteInfo}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />

        {user.token ? (
          <>
            {user.role === "trainer" && (
              <>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/plans" element={<PlansSection />} />
              </>
            )}
            {user.role === "trainee" && (
              <>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/dashboard" element={<ClientDashboard />} />
              </>
            )}
            <Route path="*" element={<Navigate to={"/dashboard"} />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
