import React from "react";
import { Card, Col } from "antd";
import RequireNewPasswordForm from "./RequireNewPasswordForm";

const RequireNewPassword = props => {
  const { authState } = props;
  if (authState !== "requireNewPassword") {
    return null;
  }
  return (
    <Col xs={24} sm={12} md={8}>
      <Card title="Change Password">
        <RequireNewPasswordForm {...this.props} />
      </Card>
    </Col>
  );
};

export default RequireNewPassword;
