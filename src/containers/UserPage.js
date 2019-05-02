import React, { Component } from "react";
import NoteBook from "../components/NoteBook";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNoteBooks, getUsers } from "../redux/actions/actions";
import "../StyleSheets/UserPage.css";
import NewNoteBook from "../components/NewNoteBook";
class UserPage extends Component {
  componentDidMount() {
    this.props.fetchNoteBooks();
    this.props.getUsers();
  }
  state = {
    notebook: {
      title: ""
    }
  };

  handleNoteBookSubmit = (e, obj) => {
    e.preventDefault();
    e.persist();
    this.postNoteBook(obj.notebook.title, this.props.currentUser.id);
    // window.location.reload();
  };
  postNoteBook = (title, id) => {
    console.log("THIS");
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
      return this.props.notebooks
        .filter(notebook => {
          return (
            notebook.relationships.user.data.id === this.props.currentUser.id
          );
        })
        .map(notebook => {
          return (
            <NoteBook
              key={notebook.id}
              notebook={notebook}
              currentUser={this.props.currentUser}
              handleNoteBookSubmit={this.handleNoteBookSubmit}
            />
          );
        });
    } else {
      console.log(this.props.notebooks, "else", this.props.currentUser);
      return <div>No Notebooks</div>;
    }
  };
  // notebooks are populating on 3rd render but by that time

  render() {
    console.log(this.props.notebooks, "user", this.props);
    return (
      <div className="userPage-div">
        <div className="logout-div">
          <button className="logOut" onClick={() => this.props.logOut()}>
            Log Out{" "}
          </button>
        </div>
        <div className="new-NB-container">
          <h1 className="your-notebooks">Your Notebooks</h1>
          <div className="notebooks-list">{this.myNoteBooks()}</div>
          <span className="newNoteBook">
            <NewNoteBook
              currentUser={this.props.currentUser}
              handleNoteBookSubmit={this.handleNoteBookSubmit}
            />
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state, "state", ownProps);
  if (state) {
    return {
      currentUser: state.currentUser,
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
