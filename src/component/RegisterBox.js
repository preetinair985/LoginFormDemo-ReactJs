import React, { Component } from "react";
class RegisterBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      username: "",
      email: "",
      password: "",
      pwdState: null
    };
  }

  // To Show Validation
  showValidationErr(elm, msg) {
    //elm=username, msg= Username cannot be empty
    this.setState(prevState => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  }

  // To Clear Validation
  clearValidationErr(elm) {
    //elm=username
    this.setState(prevState => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  // OnChange methoda
  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
    this.clearValidationErr("username");
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    });
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
    this.clearValidationErr("password");

    this.setState({
      pwdState: "weak"
    });
    if (e.target.value.length > 8 && e.target.value.length <= 12) {
      this.setState({
        pwdState: "medium"
      });
    } else if (e.target.value.length > 12) {
      this.setState({
        pwdState: "strong"
      });
    }
  }

  // checkEmail(str) {
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (!re.test(str))
  //       alert("Please enter a valid email address");
  // }

  // Submit Registration
  submitRegister(e) {
    if (this.state.username === "") {
      this.showValidationErr("username", "Username cannot be empty");
    }
    if (this.state.email === "") {
      this.showValidationErr("email", "Email cannot be empty");
    }
    if (this.state.password === "") {
      this.showValidationErr("password", "Password cannot be empty");
    }
  }

  render() {
    let usernameErr = null;
    let passwordErr = null;
    let emailErr = null;

    // Assign error message
    for (let err of this.state.errors) {
      if (err.elm === "username") {
        usernameErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
      if (err.elm === "email") {
        emailErr = err.msg;
      }
    }
    let pwdWeak = false;
    let pwdMedium = false;
    let pwdStrong = false;

    // Password States: Strong, medium, weak
    if (this.state.pwdState === "weak") {
      pwdWeak = true;
    } else if (this.state.pwdState === "medium") {
      pwdWeak = true;
      pwdMedium = true;
    } else if (this.state.pwdState === "strong") {
      pwdWeak = true;
      pwdMedium = true;
      pwdStrong = true;
    }

    return (
      <div className="inner-container">
        <div className="header">Register</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onUsernameChange.bind(this)}
            />
            <small className="danger-error">
              {usernameErr ? usernameErr : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={this.onEmailChange.bind(this)}
              // onBlur={this.checkEmail.bind(this.value)}
            />
            <small className="danger-error">{emailErr ? emailErr : ""}</small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onPasswordChange.bind(this)}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>

            {this.state.password && (
              <div className="password-state">
                <div
                  className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}
                ></div>
                <div
                  className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}
                ></div>
                <div
                  className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}
                ></div>
              </div>
            )}
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={this.submitRegister.bind(this)}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}
export default RegisterBox;
