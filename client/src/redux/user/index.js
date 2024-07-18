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
};

export const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const setUserInfo = (payload) => {
  const { name, id, role, age, height, weight, fitnessGoals } = payload;
  return {
    type: GET_INFO,
    payload: {
      name,
      id,
      role,
      age,
      height,
      weight,
      fitnessGoals,
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
      window.localStorage.removeItem("fitnessGoals");
      return {
        ...initialState,
        token: "",
        role: "",
        name: "",
        id: "",
        age: "",
        height: "",
        weight: "",
        fitnessGoals: "",
      };
    case GET_INFO:
      window.localStorage.setItem("name", action.payload.name);
      window.localStorage.setItem("id", action.payload.id);
      window.localStorage.setItem("age", action.payload.age);
      window.localStorage.setItem("height", action.payload.height);
      window.localStorage.setItem("weight", action.payload.weight);
      window.localStorage.setItem("fitnessGoals", action.payload.fitnessGoals);
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        role: action.payload.role,
        age: action.payload.age,
        height: action.payload.height,
        weight: action.payload.weight,
        fitnessGoals: action.payload.fitnessGoals,
      };
    default:
      return state;
  }
};

export default authReducer;
