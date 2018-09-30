import React from "react";
import { Auth, JS, I18n } from "aws-amplify";
import { Form, Button, Input, Icon, message, Row } from "antd";

import AuthPiece from "../AuthPiece";

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

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.signIn();
      }
    });
  }

  login(data) {
    if (typeof this.props.login === "function") {
      this.props.login(data);
    }
  }

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
    let {
      usernameInputProps = {},
      passwordInputProps = {},
      hideSignUpLink = false,
      hideResetPasswordLink = false,
      buttonProps: {}
    } = this.props;
    usernameInputProps = {
      prefix: <Icon type="user" />,
      size: "large",
      placeholder: "Username",
      ...usernameInputProps,
      onChange: this.handleInputChange,
      name: "username"
    };
    passwordInputProps = {
      prefix: <Icon type="lock" />,
      size: "large",
      placeholder: "Password",
      ...passwordInputProps,
      onChange: this.handleInputChange,
      name: "password",
      type: "password"
    };
    buttonProps = {
      size: 'large',
      type: 'primary',
      type: 'primary',
      label: 'Submit',
      ...buttonProps,
      loading,
      disabled: loading,
      htmlType: 'submit'
    }

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="antd-amplify-form antd-amplify-form-signin"
      >
        <FormItem>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input {...usernameInputProps} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(<Input {...passwordInputProps} />)}
        </FormItem>
        <FormItem>
          <Row type="flex" align="space-between">
            {!hideResetPasswordLink && (
              <span>
                {I18n.get("Forgot Password? ")}
                <a
                  disabled={this.state.loading}
                  onClick={() => this.changeState("forgotPassword")}
                >
                  Reset
                </a>
              </span>
            )}
            {!hideSignUpLink && (
              <span>
                <a
                  disabled={this.state.loading}
                  onClick={() => this.changeState("signUp")}
                >
                  {I18n.get("Sign Up")}
                </a>
              </span>
            )}
            <Button {...buttonProps}
            >
              {buttonProps.label}
            </Button>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SignIn);
