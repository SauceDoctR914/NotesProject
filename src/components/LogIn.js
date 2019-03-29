import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/actions/actions";
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
    console.log(obj.auth, "GGGAZ");
    this.login(obj);
    this.props.history.push(`/${this.state.auth.email}/homepage`);
    setTimeout(() => window.location.reload(), 0);
  };

  login = obj => {
    fetch("http://localhost:3002/api/user_token", {
      // mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        auth: {
          email: obj.auth.email,
          password: obj.auth.password
        }
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          this.setState({ errors: true });
        } else {
          localStorage.setItem("jwt", user.jwt);
          if (user.jwt) {
            this.props.history.push(`/${this.state.auth.email}/homepage`);
          }
        }
      })
      .catch(console.error);
  };
  render() {
    return (
      <div className="login-parent">
        <div className="login-container" />
        <div className="login-div">
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
              type="text"
              value={this.state.auth.email}
            />
            <br />
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
            <input type="submit" name="Submit" value="Sign In" id="sign-in" />
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
