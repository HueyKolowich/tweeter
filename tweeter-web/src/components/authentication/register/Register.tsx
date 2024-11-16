import "./Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationField from "../AuthenticationField";
import useUserInfo from "../../userInfo/UserInfoHook";
import { RegisterView, RegistrationPresenter } from "../../../presenters/authentication/RegistrationPresenter";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [imageBytes, setImageBytes] = useState<Uint8Array>(new Uint8Array());
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFileExtension, setImageFileExtension] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const listener: RegisterView = {
    setImageUrl: setImageUrl,
    setImageBytes: setImageBytes,
    setImageFileExtension: setImageFileExtension,
    setIsLoading: setIsLoading,
    updateUserInfo: updateUserInfo,
    navigate: navigate,
    displayErrorMessage: displayErrorMessage
  } 
  const [presenter] = useState(new RegistrationPresenter(listener));

  const checkSubmitButtonStatus = (): boolean => {
    return presenter.checkSubmitButtonStatus(
      firstName,
      lastName,
      alias,
      password,
      imageUrl,
      imageFileExtension
    );
  };

  const registerOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    presenter.registerOnEnter(
      event, 
      firstName, 
      lastName, 
      alias, 
      password, 
      imageUrl,
      imageBytes, 
      imageFileExtension,
      rememberMe
    );
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    presenter.handleFileChange(event);
  };

  const doRegister = async () => {
    presenter.doRegister(
      firstName,
      lastName,
      alias,
      password,
      imageBytes,
      imageFileExtension,
      rememberMe
    );
  };

  const inputFieldGenerator = () => {
    return (
      <>
        <AuthenticationField 
          type="text"
          className="form-control"
          id="firstNameInput"
          name="First Name"
          placeholder="First Name"
          keyDownHandler={registerOnEnter}
          onChangeHandler={(event) => setFirstName(event.target.value)}
        />
        <AuthenticationField 
          type="text"
          className="form-control"
          id="lastNameInput"
          name="Last Name"
          placeholder="Last Name"
          keyDownHandler={registerOnEnter}
          onChangeHandler={(event) => setLastName(event.target.value)}
        />
        <AuthenticationField 
          type="text"
          className="form-control"
          id="aliasInput"
          name="Alias"
          placeholder="name@example.com"
          keyDownHandler={registerOnEnter}
          onChangeHandler={(event) => setAlias(event.target.value)}
        />
        <AuthenticationField 
          type="password"
          className="form-control bottom"
          id="passwordInput"
          name="Password"
          placeholder="Password"
          keyDownHandler={registerOnEnter}
          onChangeHandler={(event) => setPassword(event.target.value)}
        />
        <div className="form-floating mb-3">
          <input
            type="file"
            className="d-inline-block py-5 px-4 form-control bottom"
            id="imageFileInput"
            onKeyDown={registerOnEnter}
            onChange={handleFileChange}
          />
          <label htmlFor="imageFileInput">User Image</label>
          <img src={imageUrl} className="img-thumbnail" alt=""></img>
        </div>
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Algready registered? <Link to="/login">Sign in</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Register"
      submitButtonLabel="Register"
      oAuthHeading="Register with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={isLoading}
      submit={doRegister}
    />
  );
};

export default Register;
