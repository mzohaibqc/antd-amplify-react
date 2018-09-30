import React from "react";
import { Form, Icon, Input, Button, Row, message } from "antd";

import { Auth, Logger } from "aws-amplify";
import AuthPiece from "./AuthPiece";

const logger = new Logger("ForgotPasswordForm");
const FormItem = Form.Item;

class ResetPasswordForm extends AuthPiece {
  constructor(props) {
    super(props);

    this.send = this.send.bind(this);
    this.submit = this.submit.bind(this);
    this.sendView = this.sendView.bind(this);
    this.submitView = this.submitView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { delivery: null, loading: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const { delivery } = this.state;
        if (delivery) {
          this.submit();
        } else {
          this.send();
        }
      }
    });
  };

  send() {
    const { username } = this.inputs;
    Auth.forgotPassword(username)
      .then(data => {
        this.setState({ loading: false });
        logger.debug(data);
        this.setState({ delivery: data.CodeDeliveryDetails });
      })
      .catch(err => {
        this.setState({ loading: false });
        message.error(err.message);
      });
  }

  submit() {
    const { username, code, password } = this.inputs;
    Auth.forgotPasswordSubmit(username, code, password)
      .then(data => {
        this.setState({ loading: false });
        logger.debug(data);
        this.changeState("signIn");
        message.success(
          "Your password has been reset. Kindly login with new password."
        );
        this.setState({ delivery: null });
      })
      .catch(err => {
        this.setState({ loading: false });
        message.error(err.message);
      });
  }

  sendView () {
    const { getFieldDecorator } = this.props.form;
    let {
      usernameInputProps = {}
    } = this.props;
    usernameInputProps = {
      prefix: <Icon type="user" />,
      size: "large",
      placeholder: "Email",
      message: 'Please enter your email!',
      ...usernameInputProps,
      onChange: this.handleInputChange,
      name: "email",
    };
    
    return (
      <FormItem>
        {getFieldDecorator("username", {
          rules: [
            {
              required: true,
              type: "email",
              message: usernameInputProps.message
            }
          ]
        })(
          <Input {...usernameInputProps} />
        )}
      </FormItem>
    );
  };

  submitView () {
    const { getFieldDecorator } = this.props.form;
    let {
      codeInputProps = {},
      passwordInputProps = {}
    } = this.props;
    codeInputProps = {
      prefix: <Icon type="lock" />,
      size: "large",
      placeholder: "Code",
      message: 'Please enter secret code!',
      ...codeInputProps,
      onChange: this.handleInputChange,
      name: "code"
    };
    passwordInputProps = {
      prefix: <Icon type="lock" />,
      size: "large",
      placeholder: "Password",
      message: 'Please enter your password!',
      ...passwordInputProps,
      onChange: this.handleInputChange,
      name: "password",
      type: "password"
    };
    return (
      <React.Fragment>
        <FormItem>
          {getFieldDecorator("code", {
            rules: [{ required: true, message: codeInputProps.message}]
          })(
            <Input {...codeInputProps} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: passwordInputProps.message
              }
            ]
          })(
            <Input {...passwordInputProps} />
          )}
        </FormItem>
      </React.Fragment>
    );
  };

  render() {
    const { authState } = this.props;
    if ("forgotPassword" !== authState) {
      return null;
    }

    const { delivery, loading } = this.state;
    let {
      buttonProps = {}
    } = this.props;
    buttonProps = {
      size: 'large',
      type: 'primary',
      label: 'Submit',
      className: `antd-amplify-full-width ${buttonProps.className? buttonProps.className : ''}`,
      ...buttonProps,
      loading,
      disabled: loading,
      htmlType: 'submit'
    }
    return (
      <Form onSubmit={this.handleSubmit} className="antd-amplify-form antd-amplify-form-forgotpassword">
        {delivery ? this.submitView() : this.sendView()}
        <FormItem>
          <Row type="flex" align="space-between">
            <span>
              Back to{" "}
              <a
                disabled={this.state.loading}
                onClick={() => this.changeState("signIn")}
              >
                Sign In
              </a>
            </span>
            <Button {...buttonProps}>
              {buttonProps.label}
            </Button>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ResetPasswordForm);
