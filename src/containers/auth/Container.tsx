import * as React from "react";
import { Redirect } from "react-router-dom";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ApplicationState } from "../../store/root";
import * as Store from "../../store/auth";

interface PropsFromState {
  initialized: boolean,
  user: Store.AuthUser,
  errors?: string
}
interface PropsFromDispatch {
  loginUser: typeof Store.loginUser,
  refreshSession: typeof Store.refreshSession,
  authenticateUser: typeof Store.authenticateUser,
  logOutUser: typeof Store.logOutUser
}
interface PropsFromParent {
  shouldAuthenticateUser?: boolean,
  redirectAfterLogin?: string,
  redirectAfterLogout?: string
}
interface ManagedProps {
  refreshSession: typeof Store.refreshSession,
  loginUser: typeof Store.loginUser,
  logOutUser: typeof Store.logOutUser
}
type ContainerProps = PropsFromState &
                      PropsFromDispatch &
                      PropsFromParent;

type ChildProps = PropsFromState &
                  ManagedProps;

interface OtherProps {
  children: (props: ChildProps) => React.ReactNode
}

type AllProps = ContainerProps & OtherProps;

interface State {
  isLoggedIn: boolean,
  redirectTo?: string
}

class Container extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      isLoggedIn: props.user.isAuthenticated
    };
  }

  public componentDidMount() {
    const { shouldAuthenticateUser, authenticateUser } = this.props;

    if (shouldAuthenticateUser && authenticateUser) {
      authenticateUser();
    }
  }

  public componentWillReceiveProps(nextProps: AllProps) {
    const wasLoggedIn = this.state.isLoggedIn;
    const isLoggedIn = nextProps.user.isAuthenticated;

    const redirectTo = this.shouldRedirectTo(wasLoggedIn, isLoggedIn);

    const newState = { isLoggedIn, redirectTo };
    this.setState(newState);
  }
  private shouldRedirectTo = (wasLoggedIn: boolean, isLoggedIn: boolean) : string | undefined => {
    const { redirectAfterLogin, redirectAfterLogout } = this.props;

    if(!wasLoggedIn && isLoggedIn && redirectAfterLogin) {
      return redirectAfterLogin;
    }

    if(!isLoggedIn && wasLoggedIn && redirectAfterLogout) {
      return redirectAfterLogout;
    }

    return undefined;
  }

  public render() {
    const { children, initialized, user, errors, refreshSession, loginUser, logOutUser } = this.props;
    const { redirectTo } = this.state;

    if(redirectTo) {
      return (
        <Redirect to={redirectTo} />
      );
    }

    return children({ initialized, user, errors, refreshSession, loginUser, logOutUser });
  }
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  initialized: auth.initialized,
  user: auth.user,
  errors: auth.errors
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { refreshSession, loginUser, authenticateUser, logOutUser } = Store;
  const actions = {
    refreshSession,
    loginUser,
    authenticateUser,
    logOutUser
  };

  return bindActionCreators(actions, dispatch);
};

const connectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export {
  connectedContainer as Container
};
