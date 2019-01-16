import React, { Component } from "react";
import NoteBook from "../components/NoteBook";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNoteBooks } from "../redux/actions/actions";
class UserPage extends Component {
  componentDidMount() {
    this.props.fetchNoteBooks();
  }

  myNoteBooks = () => {
    if (this.props.notebooks.length > 0) {
      return this.props.notebooks.map(notebook => {
        return <NoteBook key={notebook.id} notebook={notebook} />;
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
        <button className="logOut" onClick={() => this.props.logOut()}>
          Log Out{" "}
        </button>
        {this.myNoteBooks()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  if (state) {
    return {
      jwt: state.currentUser.jwt,
      notebooks: state.notebooks
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
  )(UserPage)
);
