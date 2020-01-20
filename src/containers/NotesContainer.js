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
import TranslateText from "../containers/TranslateText";
import "../StyleSheets/NotesContainer.css";
import NewNote from "../components/NewNote";
class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchNotes();
    this.props.fetchNoteBooks();
    this.props.getUsers();
  }

  handleDelete = (e, note, id) => {
    e.preventDefault();
    this.props.deleteNote(note, id);
    this.setState({ notes: this.props.notes });
    window.location.reload();
  };

  mapNotes = () => {
    if (this.props.notes.length > 0) {
      return this.props.notes
        .filter(
          note =>
            note.relationships.notebook.data.id === this.props.match.params.id
        )
        .map(note => {
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
  state = {
    note: {
      title: "",
      created: "",
      description: "",
      content: "",
      notebook_id: ""
    },
    notes: []
  };

  handleSubmit = (e, obj) => {
    e.preventDefault();
    e.persist();
    this.postNote(
      obj.note.title,
      obj.note.created,
      obj.note.description,
      obj.note.content
    );
    window.location.reload();
  };
  //   currentUser: this.props.users.filter(
  //     user => user.id === this.props.notebook.relationships.users.data.id
  //   )[0]
  // };

  postNote = (title, created, description, content) => {
    const URL = "http://localhost:3002/api/v1/notes";
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        note: {
          title: title,
          created: created,
          description: description,
          content: content,
          notebook_id: this.props.match.params.id
        }
      })
    }).then(res => res.json());
  };

  render() {
    return (
      <React.Fragment key={this.props.match.params.id}>
        <div className="note-container">
          <div className="note-layout">
            <div className="notes">
              {this.props.notebook ? (
                <h2 className="notebook-title">
                  {this.props.notebook.attributes.title}
                </h2>
              ) : null}
              {this.mapNotes()}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.users && state.notes && state.notebooks) {
    return {
      notes: state.notes,
      notebook: state.notebooks.filter(
        notebook => notebook.id === ownProps.match.params.id
      )[0],
      users: state.users,
      currentUser: state.currentUser
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

// <div className="NewNote">
//   <NewNote
//     key={this.props.match.params.id}
//     handleSubmit={this.handleSubmit}
//     title={this.state.note.title}
//     created={this.state.note.created}
//     description={this.state.note.description}
//     content={this.state.note.content}
//   />
// </div>
