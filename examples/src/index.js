import React from "react";
import { Authenticator } from "aws-amplify-react";
import { render } from "react-dom";
import AuthFlow, {
  BasicLayout,
  SignIn,
  RequireNewPassword,
  ResetPassword,
  ConfirmSignUp,
  SignUp
} from "../../src";

const App = () => (
  <Authenticator hideDefault>
    <BasicLayout>
      <AuthFlow
        tabPosition="left"
        tabView
        signInFormProps={{
          hideSignUpLink: false,
          hideResetPasswordLink: false,
          usernameInputProps: {
            message: "Invalid username!"
          }
        }}
      />
      {/* <SignIn title="Sign In" formProps={{
        hideSignUpLink: false,
        hideResetPasswordLink: false,
        usernameInputProps: {
          message: 'Invalid username!'
        }
      }} />
      <SignUp />
      <RequireNewPassword />
      <ResetPassword />
      <ConfirmSignUp /> */}
    </BasicLayout>
  </Authenticator>
);
render(<App />, document.getElementById("root"));
