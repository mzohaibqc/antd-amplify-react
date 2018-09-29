import React from "react";
import {
  Authenticator
} from "aws-amplify-react";
import { render } from "react-dom";
import AuthFlow, { BasicLayout, SignIn, RequireNewPassword, ResetPassword, ConfirmSignUp, SignUp } from "../../src";

const App = () => (
  <Authenticator
    hideDefault
  >
    <BasicLayout>
      <SignIn />
      <SignUp />
      <RequireNewPassword />
      <ResetPassword />
      <ConfirmSignUp />
    </BasicLayout>
  </Authenticator>
);
render(<App />, document.getElementById("root"));
