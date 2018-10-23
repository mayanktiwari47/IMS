import React, { Component } from "react";
import axios from "axios";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      email: "",
      firstname: "",
      lastname: "",
      role:"admin",
      password: "",
      password_con: "",
      userdata: null,
      success: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    console.log(e.target.name + " - " + e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitHandler(e) {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:8001/api/register", this.state)
      .then(result => {
        if (result.data.errors) {
          return this.setState(result.data);
        }
        return this.setState({
          userdata: result.data,
          errors: null,
          success: true
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.success && <p>You are successfully registerated!</p>}
        <form onSubmit={this.submitHandler}>
        <input
            type="text"
            onChange={this.changeHandler}
            placeholder="username"
            name="username"
            id="username"
          />
          <br/>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={this.changeHandler}
            id="emailreg"
          />
          {this.state.errors &&
            this.state.errors.email && <p>{this.state.errors.email.msg}</p>}
          <br />
          <input
            type="text"
            onChange={this.changeHandler}
            placeholder="firstname"
            name="firstname"
            id="firstname"
          />
          {this.state.errors &&
            this.state.errors.firstname && (
              <p>{this.state.errors.firstname.msg}</p>
            )}
          <br />
          <input
            type="text"
            onChange={this.changeHandler}
            placeholder="lastname"
            name="lastname"
            id="lastname"
          />
          {this.state.errors &&
            this.state.errors.lastname && (
              <p>{this.state.errors.lastname.msg}</p>
            )}
          <br />
          <input
            type="password"
            onChange={this.changeHandler}
            placeholder="password"
            name="password"
            id="passwordreg"
          />
          {this.state.errors &&
            this.state.errors.password && (
              <p>{this.state.errors.password.msg}</p>
            )}
          <br />
          <input
            type="password"
            onChange={this.changeHandler}
            placeholder="password_con"
            name="password_con"
            id="password_con"
          />
          {this.state.errors &&
            this.state.errors.password_con && (
              <p>{this.state.errors.password_con.msg}</p>
            )}
<br />
            Select a Role - <select value={this.state.role} name="role" id="role" onChange={this.changeHandler}>
            <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="student">Student</option>
            </select>
          <br />
          <button type="Submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
