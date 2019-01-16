import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../redux/actions/actions";
import NoteBookContainer from "../containers/NoteBookContainer";
import NewNote from "../components/NewNote";
class NotesContainer extends Component {
  componentDidMount() {
    this.props.fetchNotes();
    console.log(this.props.notebook, "gavBro");
  }

  // componentDidUpdate(){}

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
    console.log(this.props, "plzzzzzz", this.props.currentUser);
    return (
      <React.Fragment>
        <button className="logOut" onClick={() => this.props.logOut()}>
          Log Out{" "}
        </button>
        <Link
          to={{
            pathname: `${this.props.match.url}/editnotebook`,
            state: { notebook: this.notebook }
          }}
        >
          <button className="edit-note-button">Edit NoteBook</button>
        </Link>
        <div className="note-layout">{this.mapNotes()}</div>
        <div className="NewNote">
          <NewNote />
        </div>
        <Link to={{ pathname: `/homepage/` }}>
          <button className="back">Back</button>
        </Link>
        <div />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state) {
    return {
      user: state.currentUser,
      jwt: state.currentUser.jwt,
      notes: state.notes,
      notebook: state.notebooks.filter(
        notebook => notebook.id === ownProps.match.params.id
      )[0]
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

// <NoteBookContainer notebook={this.props.location.state} />
