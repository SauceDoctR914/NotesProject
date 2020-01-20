import React, { Component } from "react";
import NoteBook from "../components/NoteBook";
import {
  Link,
  Route,
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";
import { connect } from "react-redux";
import { fetchNoteBooks, getUsers } from "../redux/actions/actions";
import "../StyleSheets/UserPage.css";
import NewNoteBook from "../components/NewNoteBook";
import NotesContainer from "../containers/NotesContainer";
class UserPage extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.fetchNoteBooks();
    console.log(this.props.users, "USERS")
    this.setState({ users: this.props.users });
  }
  state = {
    notebook: {
      title: ""
    },
    users: ""
  //   this.props.users.map(user => {
  //     return user.attributes.email
  //   //   if (localStorage.getItem("email") == user.attributes.email){
  //   //   return user.id
  //   // }
  // })
  };
  //GET USER ACTION, PASS IN ROUTER PROPS FROM APP TO USE IN LINK
  handleNoteBookSubmit = (e, obj) => {
    e.preventDefault();
    e.persist();
    this.postNoteBook(obj.notebook.title, this.props.currentUser.id);
    // window.location.reload();
  };
  postNoteBook = (title, id) => {
    const URL = "http://localhost:3002/api/v1/notebooks";
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        notebook: {
          title: title,
          user_id: id
        }
      })
    }).then(res => res.json());
  };

  myNoteBooks = () => {
    if (this.props.notebooks.length > 0) {
      return (
        this.props.notebooks
          .filter(notebook => {
            return (
              notebook.relationships.user.data.id === this.state.id
            );
          }).map(notebook => {
                return (
                  <React.Fragment>
                    <div className="nb-title">
                      <Link
                        to={{
                          pathname: `/homepage/notebook/${notebook.id}`,
                          state: { currentUser: this.props.currentUser }
                        }}
                      >
                        {notebook.attributes.title}
                      </Link>
                      <span className="edit-nb-span">
                        <Link
                          to={{
                            pathname: `/homepage/notebook/${
                              notebook.id
                            }/editnotebook`
                          }}
                        >
                          <button className="edit-nb-btn"> Edit</button>
                        </Link>
                      </span>
                    </div>
                    <br />
                  </React.Fragment>
                );
              })
      );
    } else {
      console.log(this.props.notebooks, "else", this.props.currentUser);
      return <div>No Notebooks</div>;
    }
  };
  // notebooks are populating on 3rd render but by that time

  render() {
    console.log(this.state.id, "user", this.props);
    return (
      <Router>
        <React.Fragment>
          <div className="logout-div">
            <button
              className="logOut"
              onClick={() => {
                this.props.logOut();
                window.location.reload();
                this.forceUpdate();
              }}
            >
              Log Out{" "}
            </button>
          </div>
          <div className="userPage-div">
            <div className="notebooks-list">
              <h1 className="your-notebooks">Your Notebooks</h1>
              {this.myNoteBooks()}
            </div>
            <div className="new-NB-container">
              <NewNoteBook
                currentUser={this.props.currentUser}
                handleNoteBookSubmit={this.handleNoteBookSubmit}
              />
            </div>
            <Route
              path="/homepage/notebook/:id"
              render={routerProps => (
                <NotesContainer {...routerProps} location={window.location} />
              )}
            />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state, "state");
  if (state) {
    return {
      users: state.users,
      notebooks: state.notebooks
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    fetchNoteBooks: () => dispatch(fetchNoteBooks())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserPage)
);
