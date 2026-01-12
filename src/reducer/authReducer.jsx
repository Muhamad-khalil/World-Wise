export const initialState = {
  user: null,
  isAuthenticated: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { initialState: { user: null, isAuthenticated: false } };
    default:
      throw new Error("unKnow action");
  }
}
