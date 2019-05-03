import React, { Component } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";
import Note from "../components/Note";
import { connect } from "react-redux";
import { fetchNotes } from "../redux/actions/actions";
import NotesContainer from "../containers/NotesContainer";
import NewNoteBook from "../components/NewNoteBook";
import EditNoteBook from "../components/EditNoteBook";
class NoteBook extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    return (
      <Router>
        <div className="notebook-bar">
          <div className="title-bar">
            <Link
              to={{
                pathname: `/homepage/notebook/${this.props.notebook.id}`,
                state: { currentUser: this.props.currentUser }
              }}
            >
              {this.props.notebook.attributes.title}
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
          <Route
            path="/homepage/notebook/:id"
            render={routerProps => (
              <NotesContainer {...routerProps} location={window.location} />
            )}
          />
        </div>
      </Router>
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
