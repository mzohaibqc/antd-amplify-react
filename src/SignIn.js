import React from "react";
import { Card, Col } from "antd";
import SignInForm from './SignInForm';

const SignIn = props => {
  const { authState } = props;
  if (authState !== "signIn") {
    return null;
  }
  const { colProps = { xs: 24, sm: 12, md: 8 }} = props;
  return (
    <Col {...colProps}>
      <Card title={props.title || 'Sign in to your account' }>
        <SignInForm {...props}  {...props.formProps}  />
      </Card>
    </Col>
  );
};

export default SignIn;
