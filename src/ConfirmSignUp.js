import React from "react";
import { Card, Col } from "antd";

import ConfirmSignUpForm from "./ConfirmSignUpForm";

const ConfirmSignUp = props => {
  const { authState } = props;
  if (authState !== "confirmSignUp") {
    return null;
  }
  const { colProps = { xs: 24, sm: 12, md: 8 }} = props;
  return (
    <Col {...colProps}>
      <Card title={props.title || 'Confirm Sign Up'}>
        <ConfirmSignUpForm {...props.formProps} {...props} />
      </Card>
    </Col>
  );
};

export default ConfirmSignUp;
