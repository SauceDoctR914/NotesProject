import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import "../StyleSheets/Signup.css";
class SignUp extends Component {
  state = {
    user: {
      email: "",
      password: "",
      passwordMatch: ""
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
    if (
      this.state.user.email &&
      this.state.user.password &&
      this.state.user.password === this.state.user.passwordMatch
    ) {
      this.signup(this.state.user.email, this.state.user.password);
    } else {
      window.alert("Something went wrong! Please try again.");
    }
  };
  componentDidMount() {}

  signup = (email, password) => {
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
            <input
              placeholder="Password"
              onChange={this.handleChange}
              name="password"
              className="password"
              type="password"
              value={this.state.user.password}
            />
            <br />
            <br />
            <input
              placeholder="Re-enter Password"
              onChange={this.handleChange}
              name="passwordMatch"
              className="password"
              type="password"
              value={this.state.user.passwordMatch}
            />
            <br />
            <button onClick={this.accountReady} className="sign-in">
              Have Account?
            </button>
            <input
              type="submit"
              name="Submit"
              value="Register"
              className="signup-button"
            />
          </form>

          <br />
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
