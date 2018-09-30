import React from "react";
import { Card, Col } from "antd";
import RequireNewPasswordForm from "./RequireNewPasswordForm";

const RequireNewPassword = props => {
  const { authState } = props;
  if (authState !== "requireNewPassword") {
    return null;
  }
  const { colProps = { xs: 24, sm: 12, md: 8 }} = props;
  return (
    <Col {...colProps}>
      <Card title={props.title || 'Change Password'}>
        <RequireNewPasswordForm {...props.formProps} {...props}  />
      </Card>
    </Col>
  );
};

export default RequireNewPassword;
