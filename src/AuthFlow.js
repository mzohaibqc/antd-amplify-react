import React from "react";
import AuthPiece from './AuthPiece';
import { Card, Radio, Row, Col, Tabs } from "antd";
import SignInForm from "./SignIn/SignInForm";
import SignUpForm from "./SignUp/SignUpForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ConfirmSignUpForm from "./ConfirmSignUpForm";
import RequireNewPasswordForm from "./RequireNewPasswordForm";

const { TabPane } = Tabs;

class AuthFlow extends AuthPiece {
  render() {
    const {
      authState,
      userRadioButtons = false,
      tabPosition = "left",
      cardView = false
    } = this.props;
    if (authState === "signedIn") {
      return null;
    }
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
        style={{ paddingTop: 10, height: 300 }}
        className="antd-amplify-auth-flow"
      >
        <TabPane tab="Sign In" key="signIn">
          <SignInForm {...this.props} />
          <RequireNewPasswordForm {...this.props} />
        </TabPane>
        <TabPane tab="Sign Up" key="signUp">
          <SignUpForm {...this.props} />
          <ConfirmSignUpForm {...this.props} />
        </TabPane>
        <TabPane tab="Reset" key="forgotPassword">
          <ResetPasswordForm {...this.props} />
        </TabPane>
      </Tabs>
    );
    if (cardView) {
      render = <Card style={{ height: 300 }}>{render}</Card>;
    }
    if (userRadioButtons) {
      render = (
        <Card title={title} className="antd-amplify-auth-flow">
          <SignInForm {...this.props} />
          <SignUpForm {...this.props} />
          <ResetPasswordForm {...this.props} />
          <ConfirmSignUpForm {...this.props} />
          <RequireNewPasswordForm {...this.props} />
        </Card>
      );
    }
    return (
      <Col xs={24} sm={12} md={8}>
        {render}
      </Col>
    );
  }
}

export default AuthFlow;
