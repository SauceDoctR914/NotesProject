import React, { Component } from "react";
import NoteBook from "../components/NoteBook";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNoteBooks, getUsers } from "../redux/actions/actions";
import "../StyleSheets/Login.css";
import NewNoteBook from "../components/NewNoteBook";
class UserPage extends Component {
  componentDidMount() {
    console.log("didmount");
    this.props.getUsers();
    this.props.fetchNoteBooks();
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
    if (this.props.notebooks && this.props.currentUser.length > 0) {
      return this.props.notebooks
        .filter(notebook => {
          return (
            notebook.relationships.user.data.id === this.props.currentUser[0].id
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
      return <div>No Notebooks</div>;
    }
  };

  render() {
    console.log(this.props.notebooks, "user", this.props);
    return (
      <div className="userPage-div">
        <div className="logout-div">
          <button className="logOut" onClick={() => this.props.logOut()}>
            Log Out{" "}
          </button>
        </div>
        <div id="newNBcontainer">
          <h1 className="your-notebooks">Your Notebooks</h1>
          <div className="notebooks-list">{this.myNoteBooks()}</div>
          <div className="newNoteBook">
            <NewNoteBook
              currentUser={this.props.currentUser}
              handleNoteBookSubmit={this.handleNoteBookSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state.currentUser, "state", ownProps);
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
