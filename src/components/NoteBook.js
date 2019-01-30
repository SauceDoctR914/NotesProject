import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../redux/actions/actions";
import NotesContainer from "../containers/NotesContainer";
import NewNoteBook from "../components/NewNoteBook";
class NoteBook extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  mapNotes = () => {
    if (this.props.notes.length > 0) {
      return this.props.notes.map(note => {
        return (
          <Note
            key={note.id}
            note={note}
            notebookID={this.props.notebook.id}
            currentUser={this.props.user}
          />
        );
      });
    } else {
      return <div>No Notes</div>;
    }
  };
  render() {
    console.log("gbaby", this.props.notebook.id);
    return (
      <React.Fragment>
        <div className="notebook-bar">
          <Link
            to={{
              pathname: `/homepage/notebook/${this.props.notebook.id}`,
              state: { currentUser: this.props.currentUser }
            }}
          >
            <div className="title-bar">
              {this.props.notebook.attributes.title}
            </div>
          </Link>
          <Link
            to={{
              pathname: `/homepage/notebook/${
                this.props.notebook.id
              }/editnotebook`
            }}
          >
            <button> Edit Notebook</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  if (state) {
    return {
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
  )(NoteBook)
);
