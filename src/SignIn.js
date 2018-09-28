import React from "react";
import { Card, Col } from "antd";
import SignInForm from './SignInForm';

const SignIn = props => {
  const { authState } = props;
  if (authState !== "signIn") {
    return null;
  }
  return (
    <Col xs={24} sm={12} md={8}>
      <Card title="Sign in to your account">
        <SignInForm {...props} />
      </Card>
    </Col>
  );
};

export default SignIn;
