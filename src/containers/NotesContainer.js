import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../redux/actions/actions";
import NoteBookContainer from "../containers/NoteBookContainer";
class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchNotes();
    const { notebook } = this.props.location.state;
  }

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
    return (
      <React.Fragment>
        <Link
          to={{
            pathname: `${this.props.match.url}/editnotebook`,
            state: { notebook: this.notebook }
          }}
        >
          <button className="edit-note-button">Edit NoteBook</button>
        </Link>
        <div>{this.mapNotes()}</div>
        <div>
          <NoteBookContainer notebook={this.props.location.state} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  if (state) {
    return {
      user: state.currentUser,
      jwt: state.currentUser.jwt,
      notes: state.notes
    };
  }
};

const mapDispatchToProps = dispatch => {
  return { fetchNotes: () => dispatch(fetchNotes()) };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NotesContainer)
);
