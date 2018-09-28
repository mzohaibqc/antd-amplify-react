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
    return (
      <FormItem>
        {getFieldDecorator("username", {
          rules: [
            {
              required: true,
              type: "email",
              message: "Please input your username!"
            }
          ]
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
    );
  };

  submitView () {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <FormItem>
          {getFieldDecorator("code", {
            rules: [{ required: true, message: "Please input secret code!" }]
          })(
            <Input
              size="large"
              prefix={<Icon type="user" />}
              placeholder="Code"
              name="code"
              onChange={this.handleInputChange}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              }
            ]
          })(
            <Input
              size="large"
              type="password"
              prefix={<Icon type="lock" />}
              placeholder="Password"
              name="password"
              onChange={this.handleInputChange}
            />
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

    const { delivery } = this.state;
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
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="antd-amplify-full-width"
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

export default Form.create()(ResetPasswordForm);
