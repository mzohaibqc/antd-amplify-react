import React from "react";
import { Card, Col } from "antd";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = props => {
  const { authState } = props;
  if (authState !== "forgotPassword") {
    return null;
  }
  const { colProps = { xs: 24, sm: 12, md: 8 }} = props;
  return (
    <Col {...colProps}>
      <Card title={props.title || 'Reset Password'}>
        <ResetPasswordForm {...props} {...props.formProps} />
      </Card>
    </Col>
  );
};

export default ResetPassword;
