import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes, fetchNoteBooks, getUsers } from "../redux/actions/actions";
import NoteBookContainer from "../containers/NoteBookContainer";
import NewNote from "../components/NewNote";
class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchNotes();
    this.props.fetchNoteBooks();
    this.props.getUsers();
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
    console.log(this.props.currentUsers, "plzzzzzz");
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
  if (state) {
    return {
      notes: state.notes,
      currentUser: state.users.filter(
        user => user.attributes.email === ownProps.match.params.email
      ),
      notebook: state.notebooks.filter(
        notebook => notebook.id === ownProps.match.params.id
      )[0]
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNoteBooks: () => dispatch(fetchNoteBooks()),
    getUsers: () => dispatch(getUsers())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotesContainer)
);

// <NoteBookContainer notebook={this.props.location.state} />
