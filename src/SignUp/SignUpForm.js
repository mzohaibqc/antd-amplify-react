import React from "react";
import { Form, Icon, Input, Button, message, Row } from "antd";
import { Auth } from "aws-amplify";

import AuthPiece from "../AuthPiece";

const FormItem = Form.Item;

class RegisterForm extends AuthPiece {
  
  constructor(props) {
    super(props);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.signUp = this.signUp.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.state = { loading: false, error: false, confirmDirty: false };
  }

  componentDidMount() {
    this.props.form.resetFields();
    message.config({
      top: 150
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.signUp();
      }
    });
  };

  checkConfirm (rule, value, callback) {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    return callback();
  };

  checkPassword (rule, value, callback) {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      return callback("Password did not match");
    }
    return callback();
  };

  handleConfirmBlur(e){
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  signUp () {
    const { email, password, role } = this.inputs;
    this.setState({ loading: true, error: false });
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        "custom:role": role
      }
    })
      // Auth.signUp(username, password, email, phone_number)
      .then(data => {
        this.setState({ loading: false });
        this.changeState("confirmSignUp", data);
      })
      .catch(err => {
        this.setState({ loading: false, error: err.message });
        message.error(err.message);
      });
  };

  render() {
    const { authState } = this.props;
    if (authState !== "signUp") {
      return null;
    }

    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    let {
      usernameInputProps = {},
      passwordInputProps = {},
      confirmPasswordInputProps = {},
      confirmPassword = true,
      buttonProps = {}
    } = this.props;
    usernameInputProps = {
      prefix: <Icon type="user" />,
      size: "large",
      placeholder: "Email",
      message: 'Please enter your email!',
      ...usernameInputProps,
      onChange: this.handleInputChange,
      name: "email"
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
    confirmPasswordInputProps = {
      prefix: <Icon type="lock" />,
      size: "large",
      placeholder: "Password",
      message: 'Please enter your password!',
      ...confirmPasswordInputProps,
      onChange: this.handleInputChange,
      name: "password",
      type: "password"
    };
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
      <Form
        onSubmit={this.handleSubmit}
        className="antd-amplify-form antd-amplify-form-signup"
      >
        <FormItem>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                type: "email",
                message: usernameInputProps.message
              }
            ]
          })(
            <Input {...usernameInputProps}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: passwordInputProps.message }]
          })(
            <Input {...passwordInputProps} />
          )}
        </FormItem>
        {confirmPassword && (
          <FormItem>
            {getFieldDecorator("confirm", {
              validateTrigger: "onBlur",
              rules: [
                {
                  required: this.props.form.getFieldValue('password'),
                  message: confirmPasswordInputProps.message
                },
                { validator: this.checkPassword }
              ]
            })(
              <Input {...confirmPasswordInputProps}
                onBlur={this.handleConfirmBlur}
              />
            )}
          </FormItem>
        )}
        <FormItem>
          <Row type="flex" justify="space-between">
            <span>
              Have an account?{" "}
              <a onClick={() => this.changeState("signIn")}>Sign In</a>
            </span>
            <span>
              <a onClick={() => this.changeState("confirmSignUp")}>
                Confirm a Code
              </a>
            </span>
          </Row>
          <Row type="flex" align="space-between">
            <Button {...buttonProps}>
              {buttonProps.label}
            </Button>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegisterForm);
