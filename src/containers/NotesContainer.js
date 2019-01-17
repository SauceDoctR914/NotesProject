import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes, fetchNoteBooks } from "../redux/actions/actions";
import NoteBookContainer from "../containers/NoteBookContainer";
import NewNote from "../components/NewNote";
class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchNotes();
    this.props.fetchNoteBooks();
  }

  // componentDidUpdate() {
  //   this.forceUpdate();
  // }

  mapNotes = () => {
    if (this.props.notes.length > 0) {
      return this.props.notes.map(note => {
        return <Note key={note.id} note={note} currentUser={this.props.user} />;
      });
    } else {
      return <div>No Notes</div>;
    }
  };
  render() {
    console.log(this.props, "plzzzzzz");
    return (
      <React.Fragment
        key={this.props.match.params.id}
        className="note-container"
      >
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
          <div className="NewNote">
            <NewNote key={this.props.match.params.id} />
          </div>
        </div>
        <Link
          to={{
            pathname: `${this.props.match.url}/editnotebook`
          }}
        >
          <button className="edit-note-button" key="edit-button">
            Edit NoteBook
          </button>
        </Link>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state) {
    return {
      notes: state.notes,
      notebook: state.notebooks.filter(
        notebook => notebook.id === ownProps.match.params.id
      )[0]
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNoteBooks: () => dispatch(fetchNoteBooks())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotesContainer)
);

// <NoteBookContainer notebook={this.props.location.state} />
