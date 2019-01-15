import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editNote } from "../redux/actions/actions";
import Moment from "moment";
class EditNote extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
  }

  //
  state = {
    note: {
      id: this.props.note.id,
      title: this.props.note.attributes.title,
      created: this.props.note.attributes.created,
      description: this.props.note.attributes.description,
      content: this.props.note.attributes.content
    }
  };

  handleNoteChange = e => {
    this.setState({
      note: { ...this.state.note, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = (e, obj) => {
    e.preventDefault();
    this.props.editNote(this.state.note);
  };

  render() {
    console.log(this.props, "api");
    return (
      <div>
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
            id="edit-title"
            type="text"
            value={this.state.note.title || ""}
          />
          <br />
          <label htmlFor="created"> Date Created: </label>
          <select
            value={this.state.note.created || ""}
            onChange={this.handleDateChange}
          >
            <option value={this.state.note.created || ""}>
              {Moment().format("MMMM Do, YYYY")}
            </option>
          </select>
          <br />
          <label htmlFor="description"> Description: </label>
          <br />
          <input
            placeholder={""}
            onChange={this.handleNoteChange}
            name="description"
            id="edit-description"
            type="text"
            value={this.state.note.description || ""}
          />
          <br />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            onChange={this.handleNoteChange}
            name="content"
            id="edit-content"
            type="text"
            value={this.state.note.content || ""}
          />
          <br />
          <input id="edit-submit" type="submit" name="Submit" />
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
  return { editNote: note => dispatch(editNote(note, ownProps.id)) };
};
// state.notes.filter(note => note.id === id);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditNote));
