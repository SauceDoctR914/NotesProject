import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editNote, fetchNotebook } from "../redux/actions/actions";
import Moment from "moment";
class EditNote extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params.id;
  }
  // notebookID = this.props.note.relationships.data.notebook.id;

  //
  state = {
    note: {
      id: this.props.note.id,
      title: this.props.note.attributes.title,
      created: this.props.note.attributes.created,
      description: this.props.note.attributes.description,
      content: this.props.note.attributes.content,
      notebookID: this.props.note.relationships.notebook.data.id,
      userID: this.props.note.relationships.user.data.id
    }
  };

  handleNoteChange = e => {
    this.setState({
      note: { ...this.state.note, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = (e, obj) => {
    e.preventDefault();
    this.props.editNote(this.state.note, this.state.note.id);
    this.props.history.push(`/homepage/notebook/1`);
    window.location.reload();
  };

  render() {
    return (
      <div className="edit-div">
        <h1 className="editNoteTitle">Edit Note</h1>
        <form
          onSubmit={e => this.handleSubmit(e, this.state)}
          className="edit-note"
        >
          <label htmlFor="title"> Note Title: </label>
          <br />
          <input
            placeholder={""}
            onChange={this.handleNoteChange}
            name="title"
            className="edit-title"
            type="text"
            value={this.state.note.title || ""}
          />
          <br />

          <br />
          <label htmlFor="description"> Description: </label>
          <br />
          <input
            placeholder={""}
            onChange={this.handleNoteChange}
            name="description"
            className="edit-description"
            type="text"
            value={this.state.note.description || ""}
          />
          <br />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            onChange={this.handleNoteChange}
            name="content"
            className="edit-content"
            type="text"
            value={this.state.note.content || ""}
          />
          <br />
          <input className="submitEditNote" type="submit" name="Submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps, "map", state);
  return {
    note: state.notes.filter(note => note.id === ownProps.match.params.id)[0]
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editNote: note => dispatch(editNote(note, ownProps.match.params.id))
  };
};
// state.notes.filter(note => note.id === id);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditNote)
);
