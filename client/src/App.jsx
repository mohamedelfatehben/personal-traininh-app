import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { getUserApi } from "./api/auth";
import { logoutUser, setUserInfo } from "./redux/user";
import Navbar from "./components/common/Navbar";
import Home from "./pages/trainee/Home";
import MultiStepModal from "./components/trainee/MultiStepForm";

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
              id: userData._id,
              name: userData.name,
              role: userData.role,
              age: userData.age,
              height: userData.height,
              weight: userData.weight,
              fitnessGoals: userData.fitnessGoals,
            })
          );

          // Check if the user is a trainee and has incomplete profile data
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
        window.localStorage.setItem("token", "");
        window.localStorage.setItem("name", "");
        window.localStorage.setItem("role", "");
        dispatch(logoutUser());
        console.log(error);
      }
    };

    fetchUserData();
  }, [user.token]);

  return (
    <BrowserRouter>
      <Navbar />
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
        <Route
          path="*"
          element={<Navigate to={user.token ? "/" : "/login"} />}
        />
        {user.token ? (
          <>
            {user.role === "trainer" && (
              <Route path="/" element={<div>Trainer Dashboard</div>} />
            )}
            {user.role === "trainee" && <Route path="/" element={<Home />} />}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
