import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Moment from "moment";
class NewNote extends Component {
  state = {
    note: {
      title: "",
      created: "",
      description: "",
      content: "",
      notebook_id: ""
    }
  };

  handleNoteChange = e => {
    const newNote = { ...this.state.note, [e.target.name]: e.target.value };
    this.setState({ note: newNote });
  };

  // handleDateChange = event => {
  //   this.setState({ created: event.target.value });
  // };

  handleSubmit = (e, obj) => {
    e.preventDefault();
    this.postNote(
      this.state.note.title,
      this.state.note.created,
      this.state.note.description,
      this.state.note.content
    );
  };

  postNote = (title, created, description, content) => {
    const URL = "http://localhost:3002/api/v1/notes";
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        note: {
          title: title,
          created: created,
          description: description,
          content: content,
          notebook_id: this.props.match.params.id
        }
      })
    }).then(res => res.json());
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e, this.state)}>
          <label htmlFor="title"> Note Title: </label>
          <br />
          <input
            onChange={this.handleNoteChange}
            name="title"
            id="title"
            type="text"
            value={this.state.note.title}
          />
          <br />
          <label htmlFor="created"> Date Created: </label>
          <select
            name="created"
            value={this.state.created}
            onChange={this.handleNoteChange}
          >
            <option value={this.state.created}>Select Date</option>
            <option value={this.state.created}>
              {Moment().format("MMMM Do, YYYY")}
            </option>
          </select>
          <br />
          <label htmlFor="description"> Description: </label>
          <br />
          <input
            onChange={this.handleNoteChange}
            name="description"
            id="description"
            type="text"
            value={this.state.note.description}
          />
          <br />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            onChange={this.handleNoteChange}
            name="content"
            id="content"
            type="text"
            value={this.state.note.content}
          />
          <br />
          <input type="submit" name="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(NewNote);
