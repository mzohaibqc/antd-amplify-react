import React from "react";
import { Card, Col } from "antd";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = props => {
  const { authState } = props;
  if (authState !== "forgotPassword") {
    return null;
  }
  return (
    <Col xs={24} sm={12} md={8}>
      <Card title="Reset Password">
        <ResetPasswordForm {...props} />
      </Card>
    </Col>
  );
};

export default ResetPassword;
