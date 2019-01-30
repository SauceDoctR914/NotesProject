import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import UserPage from "./containers/UserPage";
import { connect } from "react-redux";
import {
  fetchNoteBooks,
  getUsers,
  fetchNotes,
  fetchNotebooks
} from "./redux/actions/actions";

import NoteBook from "./components/NoteBook";
import NewNote from "./components/NewNote";
import Note from "./components/Note";
import NotesContainer from "./containers/NotesContainer";
import EditNote from "./components/EditNote";
import EditNoteBook from "./components/EditNoteBook";
import TranslateText from "./containers/TranslateText";
import "./App.css";

class App extends Component {
  state = {
    errors: false,
    auth: { email: "", password: "" }
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.fetchNotes();
    this.props.fetchNoteBooks();
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

  logOut = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
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
            render={routerProps => (
              <LogIn {...routerProps} logOut={this.logOut} />
            )}
          />
          <Route
            path={"/:email/homepage"}
            render={routerProps => (
              <UserPage {...routerProps} logOut={this.logOut} />
            )}
          />
          <Route
            exact
            path="/homepage/notebook/:id"
            render={routerProps => (
              <NotesContainer
                {...routerProps}
                logOut={this.logOut}
                location={window.location}
              />
            )}
          />
          <Route
            exact
            path="/homepage/notebook/:id/editnotebook"
            render={routerProps => (
              <EditNoteBook
                {...routerProps}
                logOut={this.logOut}
                location={window.location}
              />
            )}
          />
          <Route
            exact
            path="/:email/homepage/notes/:id"
            render={routerProps => (
              <Note {...routerProps} logOut={this.logOut} />
            )}
          />
          <Route
            path="/homepage/notes/:id/editnote"
            render={routerProps => (
              <EditNote {...routerProps} logOut={this.logOut} />
            )}
          />
          <Route
            exact
            path="/homepage/notes/:id/translate"
            render={routerProps => (
              <TranslateText {...routerProps} logOut={this.logOut} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state) {
    return {
      users: state.users,
      notes: state.notes,
      currentUser: state.users.filter(
        user => user.attributes.email === ownProps.match.params.email
      ),
      notebooks: state.notebooks
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNoteBooks: () => dispatch(fetchNoteBooks())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
