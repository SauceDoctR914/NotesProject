import React, { Component } from "react";
import NoteBook from "../components/NoteBook";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNoteBooks, getUsers } from "../redux/actions/actions";
import NewNoteBook from "../components/NewNoteBook";
class UserPage extends Component {
  componentDidMount() {
    console.log("didmount");
    this.props.getUsers();
    this.props.fetchNoteBooks();
  }
  // state ={
  //   userNoteBooks: []
  // }
  //   if (this.props.currentUser.length > 0){
  //  this.setState({userNotebooks:  });
  state = {
    notebook: {
      title: ""
    }
  };

  handleNoteBookSubmit = (e, obj) => {
    e.preventDefault();
    e.persist();
    this.postNoteBook(obj.notebook.title, this.props.currentUser.id);
    window.location.reload();
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
    if (this.props.notebooks.length > 0 && this.props.currentUser.length > 0) {
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

  //Need to figure out how to display the titles of the notebooks, then when you click one notebook, it brings you to that notebook page with all of the notes.
  // also, make it so that the edit note looks very similar to the note itself
  // you click to edit a note, then click to post a note.

  render() {
    return (
      <div className="userPage-div">
        <div className="logout-div">
          <button className="logOut" onClick={() => this.props.logOut()}>
            Log Out{" "}
          </button>
        </div>
        <h1 className="your-notebooks">Your Notebooks</h1>
        <div className="notebooks-list">{this.myNoteBooks()}</div>
        <div className="newNoteBook">
          <NewNoteBook
            currentUser={this.props.currentUser}
            handleNoteBookSubmit={this.handleNoteBookSubmit}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  if (state) {
    return {
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
    fetchNoteBooks: () => dispatch(fetchNoteBooks())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserPage)
);
