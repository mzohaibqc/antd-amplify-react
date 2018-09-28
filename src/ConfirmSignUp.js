import React from "react";
import { Card, Col } from "antd";

import ConfirmSignUpForm from "./ConfirmSignUpForm";

const ConfirmSignUp = props => {
  const { authState } = props;
  if (authState !== "confirmSignUp") {
    return null;
  }
  return (
    <Col xs={24} sm={12} md={8}>
      <Card title="Confirm Sign Up">
        <ConfirmSignUpForm {...props} />
      </Card>
    </Col>
  );
};

export default ConfirmSignUp;
