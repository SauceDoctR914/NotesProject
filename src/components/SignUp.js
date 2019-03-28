import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
class SignUp extends Component {
  state = {
    user: {
      email: "",
      password: ""
    }
  };

  handleChange = e => {
    const newUser = {
      ...this.state.user,
      [e.target.name]: e.target.value
    };
    this.setState({
      user: newUser
    });
  };

  handleSubmit = (e, obj) => {
    e.preventDefault();
    console.log("yo", e.target);
    this.signup(this.state.user.email, this.state.user.password);
  };
  componentDidMount() {}

  signup = (email, password, tester) => {
    const URL = "http://localhost:3002/api/v1/users";
    if (password) {
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password
          }
        })
      })
        .then(res => res.json())
        .then(this.props.history.push("/"));
    } else {
      alert("not same password bro"); // render something less anooying than alert
    }
  };

  logout = () => {
    localStorage.removeItem("jwt");
  };

  accountReady = () => <Redirect to="/" />;

  render() {
    return (
      <div className="login-parent">
        <div className="login-container" />
        <div className="background-login" />
        <div className="login-div">
          <h1 className="login-title">Sign Up</h1>
          <form
            onSubmit={e => this.handleSubmit(e, this.state)}
            className="signup-form"
          >
            <br />
            <input
              placeholder="E-mail"
              onChange={this.handleChange}
              name="email"
              className="email"
              type="text"
              value={this.state.user.email}
            />
            <br />
            <br />
            <br />
            <input
              placeholder="Password"
              onChange={this.handleChange}
              name="password"
              className="password"
              type="password"
              value={this.state.user.password}
            />
            <br />
            <input
              type="submit"
              name="Submit"
              value="Register"
              className="signup-button"
            />
          </form>
          <span onClick={this.accountReady} id="sign-in">
            Have an Account?
          </span>
          <br />
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
