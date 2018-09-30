import React from "react";
import AuthFlow from "./AuthFlow";
import SignInForm from "./SignIn/SignInForm";
import SignUpForm from "./SignUp/SignUpForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ConfirmSignUpForm from "./ConfirmSignUpForm";
import RequireNewPasswordForm from "./RequireNewPasswordForm";
import SignIn from "./SignIn/index";
import SignUp from "./SignUp/index";
import ResetPassword from "./ResetPassword";
import ConfirmSignUp from "./ConfirmSignUp";
import RequireNewPassword from "./RequireNewPassword";
import BasicLayout from './BasicLayout';
import "antd/dist/antd.css";
import "./styles.less";

export  {
  AuthFlow,
  SignInForm,
  SignUpForm,
  ResetPasswordForm,
  ConfirmSignUpForm,
  RequireNewPasswordForm,
  SignIn,
  SignUp,
  ResetPassword,
  ConfirmSignUp,
  RequireNewPassword,
  BasicLayout
};

export default AuthFlow;
