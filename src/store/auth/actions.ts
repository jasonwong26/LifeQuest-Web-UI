import { action } from "typesafe-actions";

import { AuthUserState, AuthActions } from "./_types";

export const setUser = (user: AuthUserState) => action(AuthActions.SET_USER, user);
