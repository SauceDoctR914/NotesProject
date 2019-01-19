import React, { Component } from "react";
import NoteBook from "../components/NoteBook";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNoteBooks, getUsers } from "../redux/actions/actions";
import NewNoteBook from "../components/NewNoteBook";
class UserPage extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.fetchNoteBooks();
  }
  // state ={
  //   userNoteBooks: []
  // }
  //   if (this.props.currentUser.length > 0){
  //  this.setState({userNotebooks:  });

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
    console.log(this.props, "userguy");
    return (
      <div className="userPage-div">
        <button className="logOut" onClick={() => this.props.logOut()}>
          Log Out{" "}
        </button>
        <div className="notebooks-list">{this.myNoteBooks()}</div>
        <div className="newNoteBook">
          <NewNoteBook currentUser={this.props.currentUser} />
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
