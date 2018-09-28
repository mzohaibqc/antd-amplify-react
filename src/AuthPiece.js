import React, { Component } from "react";

export default class AuthPiece extends Component {
  constructor(props) {
    super(props);

    this.inputs = {};

    this._isHidden = true;
    this._validAuthStates = [];
    this.changeState = this.changeState.bind(this);
    this.error = this.error.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // extract username from authData
  usernameFromAuthData() {
    const { authData } = this.props;
    if (!authData) {
      return "";
    }

    let username = "";
    if (typeof authData === "object") {
      // user object
      username = authData.user ? authData.user.username : authData.username;
    } else {
      username = authData; // username string
    }

    return username;
  }

  errorMessage(err) {
    if (typeof err === "string") {
      return err;
    }
    return err.message ? err.message : JSON.stringify(err);
  }

  triggerAuthEvent(event) {
    const state = this.props.authState;
    if (this.props.onAuthEvent) {
      this.props.onAuthEvent(state, event);
    }
  }

  changeState(state, data) {
    if (this.props.onStateChange) {
      this.props.onStateChange(state, data);
    }

    this.triggerAuthEvent({
      type: "stateChange",
      data: state
    });
  }

  error(err) {
    this.triggerAuthEvent({
      type: "error",
      data: this.errorMessage(err)
    });
  }

  handleInputChange(evt) {
    this.inputs = this.inputs || {};
    const { name, value, type, checked } = evt.target;
    const check_type = ["radio", "checkbox"].includes(type);
    this.inputs[name] = check_type ? checked : value;
    this.inputs["checkedValue"] = check_type ? value : null;
  }

  render() {
    if (!this._validAuthStates.includes(this.props.authState)) {
      this._isHidden = true;
      return null;
    }

    if (this._isHidden) {
      this.inputs = {};
      const { track } = this.props;
      if (track) track();
    }
    this._isHidden = false;

    return this.showComponent(this.props.theme || {});
  }

  showComponent(theme) {
    throw "You must implement showComponent(theme) and don't forget to set this._validAuthStates.";
  }
}
