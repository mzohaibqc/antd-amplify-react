import React from "react";
import AuthPiece from './AuthPiece';
import { Card, Radio, Row, Col, Tabs } from "antd";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ConfirmSignUpForm from "./ConfirmSignUpForm";
import RequireNewPasswordForm from "./RequireNewPasswordForm";

const { TabPane } = Tabs;

class AuthFlow extends AuthPiece {
  render() {
    const {
      authState,
    } = this.props;
    if (authState === "signedIn") {
      return null;
    }
    const {
      tabPosition = "top",
      tabView = false,
      colProps = { xs: 24, sm: 12, md: 8 },
      signInFormProps = {},
      signUpFormProps = {},
      confirmSignUpFormProps = {},
      resertPasswordFormProps = {},
      requireNewPasswordProps = {}
    } = this.props;
    let tabValue = authState;
    if (["signUp", "confirmSignUp"].indexOf(authState) > -1) {
      tabValue = "signUp";
    }
    if (["signIn", "signedOut", "requireNewPassword"].indexOf(authState) > -1) {
      tabValue = "signIn";
    }
    const title = (
      <Row type="flex" justify="center">
        <Radio.Group
          onChange={e => this.changeState(e.target.value)}
          value={tabValue}
          style={{ marginBottom: 8 }}
        >
          <Radio.Button value="signIn">SignIn</Radio.Button>
          <Radio.Button value="signUp">SignUp</Radio.Button>
          <Radio.Button value="forgotPassword">Reset</Radio.Button>
        </Radio.Group>
      </Row>
    );
    let render = (
      <Tabs
        activeKey={tabValue}
        tabPosition={tabPosition}
        onTabClick={value => this.changeState(value)}
        style={{ paddingTop: 10 }}
        className="antd-amplify-auth-flow"
      >
        <TabPane tab="Sign In" key="signIn">
          <SignInForm {...this.props} {...signInFormProps} />
          <RequireNewPasswordForm {...this.props} {...requireNewPasswordProps} />
        </TabPane>
        <TabPane tab="Sign Up" key="signUp">
          <SignUpForm {...this.props} {...signUpFormProps} />
          <ConfirmSignUpForm {...this.props} {...confirmSignUpFormProps} />
        </TabPane>
        <TabPane tab="Reset" key="forgotPassword">
          <ResetPasswordForm {...this.props} {...resertPasswordFormProps} />
        </TabPane>
      </Tabs>
    );
    if (tabView) {
    render = <Card >{render}</Card>;
    } else {
      render = (
        <Card title={title} className="antd-amplify-auth-flow">
          <SignInForm {...this.props} {...signInFormProps} />
          <SignUpForm {...this.props} />
          <ResetPasswordForm {...this.props} />
          <ConfirmSignUpForm {...this.props} />
          <RequireNewPasswordForm {...this.props} />
        </Card>
      );
    }
    return (
      <Col {...colProps}>
        {render}
      </Col>
    );
  }
}

export default AuthFlow;
