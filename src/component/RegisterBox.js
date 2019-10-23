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

  showValidationErr(elm, msg) {
    this.setState(prevState => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  }

  clearValidationErr(elm) {
    this.setState((prevState) =>{
      let newArr =[];
      for(let err of prevState.errors) {
        if(elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    })
  }

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
    })
    if(e.target.value.length > 8) {
      this.setState({
        pwdState: "medium"
      })
    }
    else if(e.target.value.length > 12) {
      this.setState({
        pwdState: "strong"
      })
    }
  }

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

  let pwdWeak = false;
  let pwdMedium = false;
  let pwdStrong = false;

  if(this.state.pwdState === "weak") {
    pwdWeak = true;
  }
  else if(this.state.pwdState === "medium") {
    pwdWeak = true;
    pwdMedium = true;
  }
  else if(this.state.pwdState === "strong") {
    pwdWeak = true;
    pwdMedium = true;
    pwdStrong = true;
  }

  render() {
    let usernameErr = null;
    let passwordErr = null;
    let emailErr = null;

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
            />
            <small className="danger-error">
              {emailErr ? emailErr : ""}
            </small>
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
              { passwordErr ? passwordErr : ""}
            </small>

            <div className="password-state">
              <div className={"pwd pwd-weak"}></div>
              <div className={"pwd pwd-medium"}></div>
              <div className={"pwd pwd-strong"}></div>
            </div>
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
