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
    console.log(this.props.currentUser, "730");
    this.props.history.push(`/${this.state.auth.email}/homepage`);
    // setTimeout(() => window.location.reload(), 10);
  };

  // login = obj => {
  //   fetch("http://localhost:3002/api/user_token", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({
  //       auth: {
  //         email: obj.auth.email,
  //         password: obj.auth.password
  //       }
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(user => {
  //       console.log("USER", user);
  //       if (user.error) {
  //         console.log("USER", user);
  //         this.setState({ errors: true });
  //       } else {
  //         console.log("USER", user);
  //         localStorage.setItem("jwt", user.jwt);
  //         if (user.jwt) {
  //           console.log("USER", user);
  //           this.props.history.push(`/${this.state.auth.email}/homepage`);
  //         }
  //       }
  //     })
  //     .catch(
  //       e =>
  //         window.alert(
  //           "Sorry, something went wrong. Please try logging in again."
  //         ) && console.error
  //     );
  // };
  render() {
    console.log(this.props.currentUser, "g");
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
const mapStateToProps = (state, ownProps) => {
  if (state) {
    console.log(state.currentUser, "state", ownProps);
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
