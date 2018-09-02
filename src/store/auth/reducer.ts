import { Reducer } from "redux";
import { AuthUserState, AuthActions } from "./_types";

const initialState: AuthUserState = {
  isAuthenticated: false,
  accountId: undefined,
  accessToken: undefined,
  isAdmin: false
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<AuthUserState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.SET_USER: {
      return { ...state, auth: action.payload };
    }
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export {
  initialState as initialAuthState,
  reducer as authReducer
};
