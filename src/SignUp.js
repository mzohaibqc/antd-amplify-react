import React from "react";
import { Card, Col } from "antd";
import SignUpForm from "./SignUpForm";

const SignUp = props => {
  const { authState } = props;
  if (authState !== "signUp") {
    return null;
  }
  const { colProps = { xs: 24, sm: 12, md: 8 }} = props;
  return (
    <Col {...colProps}>
      <Card title={props.title || 'SignUp'}>
        <SignUpForm {...props} {...props.formProps}/>
      </Card>
    </Col>
  );
};

export default SignUp;
