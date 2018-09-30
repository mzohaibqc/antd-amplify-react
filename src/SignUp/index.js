import React from "react";
import { Card, Col } from "antd";
import SignUpForm from "./SignUpForm";

const SignUp = props => {
  const { authState } = props;
  if (authState !== "signUp") {
    return null;
  }
  return (
    <Col xs={24} sm={12} md={8}>
      <Card title="SignUp">
        <SignUpForm {...props} />
      </Card>
    </Col>
  );
};

export default SignUp;
