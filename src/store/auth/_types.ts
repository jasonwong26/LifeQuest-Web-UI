
export const enum AuthActions {
  SET_USER = "@@user/SET_USER"
}

export interface AuthUserState {
  isAuthenticated: boolean,
  accountId: string | null | undefined,
  accessToken: string | null | undefined,
  isAdmin: boolean
}
