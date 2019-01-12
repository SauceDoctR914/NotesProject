import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../redux/actions/actions";
import Moment from "moment";
class EditNote extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
  }

  //
  state = {
    note: {
      id: "",
      title: this.props.note.title,
      created: "",
      description: "",
      content: ""
    }
  };

  handleNoteChange = e => {
    this.setState({
      note: { ...this.state.note, [e.target.name]: e.target.value }
    });
  };
  handleDateChange = event => {
    this.setState({ created: event.target.value });
  };

  handleSubmit = (e, obj) => {
    e.preventDefault();
    this.editNote(this.state.note, this.state.note.id);
  };

  editNote = (note, id) => {
    const URL = `http://localhost:3002/api/v1/notes/${id}`;
    fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        note: {
          title: "",
          created: "",
          description: "",
          content: ""
        }
      })
    }).then(res => res.json());
  };

  render() {
    console.log(this.props, "api");
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e, this.state)}>
          <label htmlFor="title"> Note Title: </label>
          <br />
          <input
            placeholder={""}
            onChange={this.handleNoteChange}
            name="title"
            id="title"
            type="text"
            value={""}
          />
          <br />
          <label htmlFor="created"> Date Created: </label>
          <select value={""} onChange={this.handleDateChange}>
            <option value={""}>{Moment().format("MMMM Do, YYYY")}</option>
          </select>
          <br />
          <label htmlFor="description"> Description: </label>
          <br />
          <input
            placeholder={""}
            onChange={this.handleNoteChange}
            name="description"
            id="description"
            type="text"
            value={""}
          />
          <br />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            placeholder={""}
            onChange={this.handleNoteChange}
            name="content"
            id="content"
            type="text"
            value={
              this.props.note.attributes.content || this.state.note.content
            }
          />
          <br />
          <input type="submit" name="Submit" />
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
// state.notes.filter(note => note.id === id);

export default connect(mapStateToProps)(withRouter(EditNote));
