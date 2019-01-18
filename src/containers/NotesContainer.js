import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchNotes,
  fetchNoteBooks,
  getUsers,
  deleteNote
} from "../redux/actions/actions";
import NoteBookContainer from "../containers/NoteBookContainer";
import NewNote from "../components/NewNote";
class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchNotes();
    this.props.fetchNoteBooks();
    this.props.getUsers();
  }
  state = {
    notes: []
  };
  // componentDidUpdate() {
  //   this.forceUpdate();
  // }

  handleDelete = (e, note, id) => {
    console.log("this and that and this");
    e.preventDefault();
    this.props.deleteNote(note, id);
    this.setState({ notes: this.props.notes });
  };

  mapNotes = () => {
    if (this.props.notes.length > 0) {
      return this.props.notes.map(note => {
        return (
          <Note
            key={note.id}
            note={note}
            currentUser={this.props.currentUser}
            deleteNote={this.handleDelete}
          />
        );
      });
    } else {
      return <div>No Notes</div>;
    }
  };
  render() {
    console.log(this.props.currentUser, "plzzzzzz", this.props.notebook);
    return (
      <React.Fragment key={this.props.match.params.id}>
        <div className="note-container">
          <button className="logOut" onClick={() => this.props.logOut()}>
            Log Out
          </button>
          <Link to={{ pathname: `/homepage/` }}>
            <button className="back">Back</button>
          </Link>

          {this.props.notebook ? (
            <h2 id="notebook-title">{this.props.notebook.attributes.title}</h2>
          ) : null}
          <div className="note-layout">
            <div className="notes">
              {this.mapNotes()}
              <div className="editDiv" />
            </div>
          </div>

          <div className="NewNote">
            <NewNote key={this.props.match.params.id} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state, "state", ownProps.match);
  if (state.users && state.notes && state.notebooks) {
    return {
      notes: state.notes,
      notebook: state.notebooks.filter(
        notebook => notebook.id === ownProps.match.params.id
      )[0]
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNoteBooks: () => dispatch(fetchNoteBooks()),
    getUsers: () => dispatch(getUsers()),
    deleteNote: (note, id) => dispatch(deleteNote(note, id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotesContainer)
);

// <NoteBookContainer notebook={this.props.location.state} />
