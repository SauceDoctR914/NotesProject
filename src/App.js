import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import UserPage from "./containers/UserPage";
import { connect } from "react-redux";
import { fetchNoteBooks } from "./redux/actions/actions";
import { fetchNotes } from "./redux/actions/actions";
import NoteBook from "./components/NoteBook";
import NewNote from "./components/NewNote";
import Note from "./components/Note";
import NotesContainer from "./containers/NotesContainer";
import EditNote from "./components/EditNote";
import EditNoteBook from "./components/EditNoteBook";
import "./App.css";

class App extends Component {
  state = {
    errors: false,
    auth: { email: "", password: "" }
  };

  componentDidMount() {
    const URL = "http://localhost:3002/api/v1/users";
    if (localStorage.getItem("jwt")) {
      fetch(URL, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      })
        .then(res => res.json())
        .then(user => {
          if (!user.error) {
            return this.props.currentUser;
          } else {
            this.logout();
          }
        });
    }
  }

  logout = () => {
    localStorage.removeItem("jwt");
  };

  render() {
    return (
      <div className="App">
        <Switch location={this.props.location}>
          <Route
            exact
            path="/signup"
            render={routerProps => <SignUp {...routerProps} />}
          />
          <Route
            exact
            path="/login"
            render={routerProps => <LogIn {...routerProps} />}
          />
          <Route
            path={"/:email/homepage"}
            render={routerProps => <UserPage {...routerProps} />}
          />
          <Route
            exact
            path="/homepage/notebook/:id"
            render={routerProps => <NotesContainer {...routerProps} />}
          />
          <Route
            path="/:email/homepage/notes/:id"
            render={routerProps => <Note {...routerProps} />}
          />
          <Route
            path="/homepage/notes/:id/editnote"
            render={routerProps => <EditNote {...routerProps} />}
          />
          <Route
            exact
            path="/homepage/notebook/:id/editnotebook"
            render={routerProps => <EditNoteBook {...routerProps} />}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state) {
    return {
      jwt: state.currentUser.jwt
    };
  }
};

const mapDispatchToProps = dispatch => {
  return { fetchNoteBooks: () => dispatch(fetchNoteBooks()) };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
