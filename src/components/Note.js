import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNote } from "../redux/actions/actions";
import EditNote from "./EditNote";
class Note extends Component {
  render() {
    console.log(this.props.note.attributes.created, "AY");
    return (
      <React.Fragment>
        <div className="notetitle-div">{this.props.note.attributes.title}</div>
        <br />
        <div className="date-div">{this.props.note.attributes.created}</div>
        <br />
        <div className="desc-div">{this.props.note.attributes.description}</div>
        <br />
        <div className="content-div">{this.props.note.attributes.content}</div>
        <Link
          to={{
            pathname: `/homepage/notes/${this.props.note.id}/editnote`
          }}
        >
          <button className="edit-button"> Make Changes</button>
        </Link>
        <button
          className="delete-note"
          onClick={(note, id) =>
            this.props.deleteNote(this.props.note, this.props.note.id)
          }
        >
          Delete Note
        </button>
        <Link
          to={{
            pathname: `/homepage/notes/${this.props.note.id}/translate`
          }}
        >
          <button className="translate-button"> Translate Content</button>
        </Link>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps, "map", state);
  return {
    note: state.notes.filter(note => note.id === ownProps.note.id)[0]
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteNote: note => dispatch(deleteNote(note, ownProps.note.id))
  };
};
// state.notes.filter(note => note.id === id);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Note));
