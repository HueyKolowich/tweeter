import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationField from "../AuthenticationField";
import useUserInfo from "../../userInfo/UserInfoHook";
import { LoginPresenter } from "../../../presenters/authentication/LoginPresenter";
import { NavigatorView } from "../../../presenters/Presenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const listener: NavigatorView = {
    setIsLoading: setIsLoading,
    updateUserInfo: updateUserInfo,
    navigate: navigate,
    displayErrorMessage: displayErrorMessage
  }

  const [presenter] = useState(new LoginPresenter(listener));

  const checkSubmitButtonStatus = (): boolean => {
    return presenter.checkSubmitButtonStatus(alias, password);
  };

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    presenter.loginOnEnter(event, alias, password, rememberMe, props.originalUrl);
  };

  const doLogin = async () => {
    presenter.doLogin(alias, password, rememberMe, props.originalUrl);
  };

  const inputFieldGenerator = () => {
    return (
      <>
        <AuthenticationField 
          type="text"
          className="form-control"
          id="aliasInput"
          name="Alias"
          placeholder="name@example.com"
          keyDownHandler={loginOnEnter}
          onChangeHandler={(event) => setAlias(event.target.value)}
        />
        <AuthenticationField 
          type="password"
          className="form-control bottom"
          id="passwordInput"
          name="Password"
          placeholder="Password"
          keyDownHandler={loginOnEnter}
          onChangeHandler={(event) => setPassword(event.target.value)}
        />
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={isLoading}
      submit={doLogin}
    />
  );
};

export default Login;
