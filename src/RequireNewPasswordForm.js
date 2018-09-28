import React from "react";
import { Auth, JS } from "aws-amplify";
import { Form, Button, Row, Input, Icon } from "antd";

import AuthPiece from "./AuthPiece";

const FormItem = Form.Item;

class RequireNewPasswordForm extends AuthPiece {
  constructor(props) {
    super(props);

    this._validAuthStates = ["requireNewPassword"];
    this.change = this.change.bind(this);
    this.checkContact = this.checkContact.bind(this);
    this.showComponent = this.showComponent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { loading: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.change();
      }
    });
  }

  checkContact(user) {
    if (!Auth || typeof Auth.verifiedContact !== "function") {
      throw new Error(
        "No Auth module found, please ensure @aws-amplify/auth is imported"
      );
    }
    Auth.verifiedContact(user).then(data => {
      if (!JS.isEmpty(data.verified)) {
        this.changeState("signedIn", user);
      } else {
        user = Object.assign(user, data);
        this.changeState("verifyContact", user);
      }
    });
  }

  change() {
    const user = this.props.authData;
    const { password } = this.inputs;
    const { requiredAttributes } = user.challengeParam;

    if (!Auth || typeof Auth.completeNewPassword !== "function") {
      throw new Error(
        "No Auth module found, please ensure @aws-amplify/auth is imported"
      );
    }
    this.setState({ loading: true });
    Auth.completeNewPassword(user, password, requiredAttributes)
      .then(user => {
        if (user.challengeName === "SMS_MFA") {
          this.changeState("confirmSignIn", user);
        } else if (user.challengeName === "MFA_SETUP") {
          this.changeState("TOTPSetup", user);
        } else {
          this.checkContact(user);
        }
      })
      .catch(err => this.error(err));
  }

  showComponent() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="antd-amplify-form antd-amplify-form-requirenewpassword"
      >
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="New Password"
              name="password"
              onChange={this.handleInputChange}
            />
          )}
        </FormItem>
        <FormItem>
          <Row type="flex" align="space-between">
            <span>
              Back to <a onClick={() => this.changeState("signIn")}>Sign In</a>
            </span>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="btn-wide"
              loading={this.state.loading}
              disabled={this.state.loading}
            >
              Submit
            </Button>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RequireNewPasswordForm);
