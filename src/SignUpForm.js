import React from "react";
import { Form, Icon, Input, Button, message, Row } from "antd";
import { Auth } from "aws-amplify";

import AuthPiece from "./AuthPiece";

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
    const { authState, confirmPassword = false } = this.props;
    if (authState !== "signUp") {
      return null;
    }

    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

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
                message: "Please input your Email!"
              }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="user" />}
              placeholder="Email"
              name="email"
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
        {confirmPassword && (
          <FormItem>
            {getFieldDecorator("confirm", {
              validateTrigger: "onBlur",
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                { validator: this.checkPassword }
              ]
            })(
              <Input
                placeholder="Confirm Password"
                prefix={<Icon type="lock" />}
                size="large"
                type="password"
                onBlur={this.handleConfirmBlur}
                disabled={loading}
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

export default Form.create()(RegisterForm);
