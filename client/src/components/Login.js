import React, { Component } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      role: "admin",
      error: null,
      valerrors: null
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.submitHandler}>
          {this.state.valerrors &&
            this.state.valerrors.email && (
              <p>{this.state.valerrors.email.msg}</p>
            )}
          Username:{" "}
          <input
            onChange={this.changeHandler}
            type="text"
            name="username"
            id="username"
            placeholder="Enter your Username"
          />
          <br />
          {this.state.valerrors &&
            this.state.valerrors.password && (
              <p>{this.state.valerrors.password.msg}</p>
            )}
          Password:{" "}
          <input
            onChange={this.changeHandler}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />{" "}
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  submitHandler(e) {
    e.preventDefault();
    axios.post("http://localhost:8001/api/login", this.state).then(res => {
      if (res.data.error) {
        return this.setState({ error: res.data.message });
      }
      if (res.data.errors) {
        return this.setState({ valerrors: res.data.errors });
      }

      console.log("lenght of array - " + res.data.user.role.length);
      
      if(res.data.user.role.length == 1) {
        return (window.location = "/AdminPage");
      } else if (res.data.user.role.length > 1) {

      } else {

      }
      
      res.data.user.role.forEach(function(role) {
        console.log(role);
      });
      //return (window.location = "/AdminPage");
    });
  }

  changeHandler(e) {
    console.log(e.target.name + "  = " + e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }
}
export default Login;
