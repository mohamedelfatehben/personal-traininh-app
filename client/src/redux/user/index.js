const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_INFO = "GET_INFO";

const initialState = {
  id: window.localStorage.getItem("id") || "",
  token: window.localStorage.getItem("token") || "",
  name: window.localStorage.getItem("name") || "",
  role: window.localStorage.getItem("role") || "",
  age: window.localStorage.getItem("age") || "",
  height: window.localStorage.getItem("height") || "",
  weight: window.localStorage.getItem("weight") || "",
  fitnessGoals: window.localStorage.getItem("fitnessGoals") || "",
  trainingFrequency: window.localStorage.getItem("trainingFrequency") || "",
  budget: window.localStorage.getItem("budget") || "",
  foodAllergies: [],
  plan: {
    name: window.localStorage.getItem("planName") || "",
    subscriptionEnd: window.localStorage.getItem("subscriptionEnd") || "",
  },
  nextPayment: window.localStorage.getItem("nextPayment")
    ? JSON.parse(window.localStorage.getItem("nextPayment"))
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
    fitnessGoals,
    trainingFrequency,
    foodAllergies,
    plan,
    subscriptionEnd,
    nextPayment,
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
      fitnessGoals,
      trainingFrequency,
      foodAllergies,
      plan,
      subscriptionEnd,
      nextPayment,
    },
  };
};

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
      window.localStorage.removeItem("budget");
      window.localStorage.removeItem("fitnessGoals");
      window.localStorage.removeItem("trainingFrequency");
      window.localStorage.removeItem("foodAllergies");
      window.localStorage.removeItem("planName");
      window.localStorage.removeItem("subscriptionEnd");
      window.localStorage.removeItem("nextPayment");
      return {
        ...initialState,
        token: "",
        role: "",
        name: "",
        id: "",
        age: "",
        height: "",
        weight: "",
        budget: "",
        fitnessGoals: "",
        trainingFrequency: "",
        foodAllergies: [],
        plan: {
          name: "",
          subscriptionEnd: "",
        },
        nextPayment: null,
      };
    case GET_INFO:
      window.localStorage.setItem("name", action.payload.name);
      window.localStorage.setItem("id", action.payload.id);
      window.localStorage.setItem("age", action.payload.age);
      window.localStorage.setItem("height", action.payload.height);
      window.localStorage.setItem("weight", action.payload.weight);
      window.localStorage.setItem("budget", action.payload.budget);
      window.localStorage.setItem("fitnessGoals", action.payload.fitnessGoals);
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
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        role: action.payload.role,
        age: action.payload.age,
        height: action.payload.height,
        weight: action.payload.weight,
        budget: action.payload.budget,
        fitnessGoals: action.payload.fitnessGoals,
        trainingFrequency: action.payload.trainingFrequency,
        foodAllergies: action.payload.foodAllergies,
        plan: {
          ...action.payload.plan,
          subscriptionEnd: action.payload.subscriptionEnd,
        },
        nextPayment: action.payload.nextPayment,
      };
    default:
      return state;
  }
};

export default authReducer;
