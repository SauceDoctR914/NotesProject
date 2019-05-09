import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/actions/actions";
import "../StyleSheets/Login.css";
class LogIn extends Component {
  state = {
    errors: false,
    auth: { email: "", password: "" }
  };

  handleChange = e => {
    this.setState({
      auth: { ...this.state.auth, [e.target.name]: e.target.value }
    });
  };
  handleSubmit = (e, obj) => {
    e.preventDefault();
    this.props.login(obj);
    console.log(this.props.currentUser, "730", localStorage.jwt);
  };

  render() {
    if (localStorage.length === 1) {
      this.props.history.push(`/homepage`);
      return null;
    } else {
      return (
        <div className="login-parent">
          <div className="login-form-title">
            <h1 className="login-title">Login</h1>
            <form
              onSubmit={e => this.handleSubmit(e, this.state)}
              className="login-form"
            >
              <label htmlFor="email" />
              <br />
              <input
                placeholder="E-mail"
                onChange={this.handleChange}
                name="email"
                className="email"
                type="email"
                value={this.state.auth.email}
              />
              <br />
              <label htmlFor="password" />
              <br />
              <input
                placeholder="Password"
                onChange={this.handleChange}
                name="password"
                className="password"
                type="password"
                value={this.state.auth.password}
              />
              <br />
              <input
                type="submit"
                name="Submit"
                value="Sign In"
                className="sign-in"
              />
              <Link
                to={{
                  pathname: `/signup`
                }}
              >
                <button className="signup-button">Sign Up</button>
              </Link>
            </form>
            <br />
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  if (state) {
    return {
      currentUser: state.currentUser
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: obj => dispatch(login(obj))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LogIn)
);

// <button onClick={this.props.logout()}>LogOut </button>
