const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_INFO = "GET_INFO";
const UPDATE_USER_INFO = "UPDATE_USER_INFO";

const initialState = {
  id: window.localStorage.getItem("id") || "",
  token: window.localStorage.getItem("token") || "",
  name: window.localStorage.getItem("name") || "",
  role: window.localStorage.getItem("role") || "",
  age: window.localStorage.getItem("age") || "",
  height: window.localStorage.getItem("height") || "",
  weight: window.localStorage.getItem("weight") || "",
  gender: window.localStorage.getItem("gender") || "",
  fitnessGoals: window.localStorage.getItem("fitnessGoals") || "",
  trainingFrequency: window.localStorage.getItem("trainingFrequency") || "",
  budget: window.localStorage.getItem("budget") || "",
  phoneNumber: window.localStorage.getItem("phoneNumber") || "",
  foodAllergies: [],
  plan: {
    name: window.localStorage.getItem("planName") || "",
    subscriptionEnd: window.localStorage.getItem("subscriptionEnd") || "",
  },
  nextPayment: window.localStorage.getItem("nextPayment")
    ? JSON.parse(window.localStorage.getItem("nextPayment"))
    : null,
  program: window.localStorage.getItem("program")
    ? JSON.parse(window.localStorage.getItem("program"))
    : null,
};

export const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const setUserInfo = (payload) => {
  const {
    name,
    id,
    role,
    age,
    height,
    weight,
    budget,
    gender,
    fitnessGoals,
    trainingFrequency,
    foodAllergies,
    plan,
    subscriptionEnd,
    nextPayment,
    program,
    phoneNumber,
  } = payload;
  return {
    type: GET_INFO,
    payload: {
      name,
      id,
      role,
      age,
      height,
      weight,
      budget,
      gender,
      fitnessGoals,
      trainingFrequency,
      foodAllergies,
      plan,
      subscriptionEnd,
      nextPayment,
      program,
      phoneNumber,
    },
  };
};

export const updateUserInfo = (payload) => ({
  type: UPDATE_USER_INFO,
  payload,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      window.localStorage.setItem("token", action.payload.token);
      window.localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
      };
    case LOGOUT_USER:
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("id");
      window.localStorage.removeItem("age");
      window.localStorage.removeItem("height");
      window.localStorage.removeItem("weight");
      window.localStorage.removeItem("gender");
      window.localStorage.removeItem("budget");
      window.localStorage.removeItem("fitnessGoals");
      window.localStorage.removeItem("trainingFrequency");
      window.localStorage.removeItem("foodAllergies");
      window.localStorage.removeItem("planName");
      window.localStorage.removeItem("subscriptionEnd");
      window.localStorage.removeItem("nextPayment");
      window.localStorage.removeItem("program");
      window.localStorage.removeItem("phoneNumber");
      return {
        ...initialState,
        token: "",
        role: "",
        name: "",
        id: "",
        age: "",
        height: "",
        weight: "",
        gender: "",
        budget: "",
        fitnessGoals: "",
        trainingFrequency: "",
        foodAllergies: [],
        plan: {
          name: "",
          subscriptionEnd: "",
        },
        nextPayment: null,
        program: null,
        phoneNumber: "",
      };
    case GET_INFO:
      window.localStorage.setItem("name", action.payload.name);
      window.localStorage.setItem("id", action.payload.id);
      window.localStorage.setItem("age", action.payload.age);
      window.localStorage.setItem("height", action.payload.height);
      window.localStorage.setItem("weight", action.payload.weight);
      window.localStorage.setItem("gender", action.payload.gender);
      window.localStorage.setItem("budget", action.payload.budget);
      window.localStorage.setItem("fitnessGoals", action.payload.fitnessGoals);
      window.localStorage.setItem("phoneNumber", action.payload.phoneNumber);
      window.localStorage.setItem(
        "trainingFrequency",
        action.payload.trainingFrequency
      );
      window.localStorage.setItem(
        "foodAllergies",
        JSON.stringify(action.payload.foodAllergies)
      );
      action.payload.plan &&
        window.localStorage.setItem("planName", action.payload.plan.name);
      action.payload.plan &&
        window.localStorage.setItem(
          "subscriptionEnd",
          action.payload.subscriptionEnd
        );
      action.payload.nextPayment &&
        window.localStorage.setItem(
          "nextPayment",
          JSON.stringify(action.payload.nextPayment)
        );
      action.payload.program &&
        window.localStorage.setItem(
          "program",
          JSON.stringify(action.payload.program)
        );
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        role: action.payload.role,
        age: action.payload.age,
        height: action.payload.height,
        weight: action.payload.weight,
        gender: action.payload.gender,
        budget: action.payload.budget,
        fitnessGoals: action.payload.fitnessGoals,
        trainingFrequency: action.payload.trainingFrequency,
        foodAllergies: action.payload.foodAllergies,
        plan: {
          ...action.payload.plan,
          subscriptionEnd: action.payload.subscriptionEnd,
        },
        nextPayment: action.payload.nextPayment,
        program: action.payload.program,
        phoneNumber: action.payload.phoneNumber,
      };
    case UPDATE_USER_INFO:
      // Update the local storage with the new user info
      window.localStorage.setItem("name", action.payload.name);
      window.localStorage.setItem("age", action.payload.age);
      window.localStorage.setItem("height", action.payload.height);
      window.localStorage.setItem("weight", action.payload.weight);
      window.localStorage.setItem("gender", action.payload.gender);
      window.localStorage.setItem("budget", action.payload.budget);
      window.localStorage.setItem("fitnessGoals", action.payload.fitnessGoals);
      window.localStorage.setItem("phoneNumber", action.payload.phoneNumber);
      window.localStorage.setItem(
        "trainingFrequency",
        action.payload.trainingFrequency
      );
      window.localStorage.setItem(
        "foodAllergies",
        JSON.stringify(action.payload.foodAllergies)
      );

      // Update the Redux state with the new user info
      return {
        ...state,
        name: action.payload.name,
        age: action.payload.age,
        height: action.payload.height,
        weight: action.payload.weight,
        gender: action.payload.gender,
        budget: action.payload.budget,
        fitnessGoals: action.payload.fitnessGoals,
        trainingFrequency: action.payload.trainingFrequency,
        foodAllergies: action.payload.foodAllergies,
        phoneNumber: action.payload.phoneNumber,
      };
    default:
      return state;
  }
};

export default authReducer;
