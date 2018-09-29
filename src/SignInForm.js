import React from "react";
import { Auth, JS, I18n } from "aws-amplify";
import { Form, Button, Input, Icon, message, Row } from "antd";

import AuthPiece from "./AuthPiece";

const FormItem = Form.Item;

class SignIn extends AuthPiece {
  constructor(props) {
    super(props);

    this.checkContact = this.checkContact.bind(this);
    this.signIn = this.signIn.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.showComponent = this.showComponent.bind(this);


    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(e) {
    if (this.props.authState === "signIn" && !this.props.hide) {
      if (e.keyCode === 13) {
        // when press enter
        this.handleSubmit();
      }
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.signIn();
      }
    });
  };

  login (data) {
    if (typeof this.props.login === 'function') {
      this.props.login(data);
    }
  };

  checkContact(user) {
    if (!Auth || typeof Auth.verifiedContact !== "function") {
      throw new Error(
        "No Auth module found, please ensure @aws-amplify/auth is imported"
      );
    }
    Auth.verifiedContact(user).then(data => {
      this.setState({ loading: false });
      this.login(user);
      if (!JS.isEmpty(data.verified)) {
        this.changeState("signedIn", user);
      } else {
        user = Object.assign(user, data);
        this.changeState("verifyContact", user);
      }
    });
  }

  signIn() {
    const { username, password } = this.inputs;
    if (!Auth || typeof Auth.signIn !== "function") {
      throw new Error(
        "No Auth module found, please ensure @aws-amplify/auth is imported"
      );
    }
    this.setState({ loading: true });
    Auth.signIn(username, password)
      .then(user => {
        let loading = false;
        if (
          user.challengeName === "SMS_MFA" ||
          user.challengeName === "SOFTWARE_TOKEN_MFA"
        ) {
          this.changeState("confirmSignIn", user);
        } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.changeState("requireNewPassword", user);
        } else if (user.challengeName === "MFA_SETUP") {
          this.changeState("TOTPSetup", user);
        } else {
          loading = true;
          this.checkContact(user);
        }
        if (!loading) {
          this.login(user);
        }
        this.setState({ loading });
      })
      .catch(err => {
        this.setState({ loading: false });

        if (err.code === "UserNotConfirmedException") {
          this.changeState("confirmSignUp");
        } else if (err.code === "PasswordResetRequiredException") {
          this.changeState("requireNewPassword");
        } else {
          message.error(err.message, 5);
        }
      });
  }

  showComponent() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="antd-amplify-form antd-amplify-form-signin">
        <FormItem>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              size="large"
              prefix={<Icon type="user" />}
              placeholder="Username"
              name="username"
              onChange={this.handleInputChange}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleInputChange}
            />
          )}
        </FormItem>
        <FormItem>
          <Row type="flex" align="space-between">
            <span>
              {I18n.get("Forgot Password? ")}
              <a
                disabled={this.state.loading}
                onClick={() => this.changeState("forgotPassword")}
              >
                Reset
              </a>
            </span>
            <span>
              
              <a
                disabled={this.state.loading}
                onClick={() => this.changeState("signUp")}
              >
                {I18n.get("Create Account ")}
              </a>
            </span>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="antd-amplify-full-width"
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SignIn);
