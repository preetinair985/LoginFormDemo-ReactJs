import React, { Component } from "react";
import LoginBox from "./component/LoginBox";
import RegisterBox from "./component/RegisterBox";
import '../src/css/Style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  render() {
    return (
      <div className="box-container">
        {this.state.isLoginOpen && <LoginBox />}
        {this.state.isRegisterOpen && <RegisterBox />}
      </div>
    );
  }
}

export default App;
