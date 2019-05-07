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
  render() {
    return (
      <div id="containerNewNote">
        <h3>Add a Note:</h3>
        <form
          className="newNoteForm"
          onSubmit={e => this.props.handleSubmit(e, this.state)}
        >
          <label htmlFor="title"> </label>
          <br />
          <input
            placeholder="Note Title"
            onChange={this.handleNoteChange}
            name="title"
            className="title"
            type="text"
            maxlength="20"
            value={this.state.title}
          />
          <br />
          <label htmlFor="created" />
          <select
            name="created"
            value={this.state.created}
            onChange={this.handleNoteChange}
            className="created"
            required
          >
            <option value={this.state.created}>Select Date</option>
            <option value={this.state.created}>
              {Moment().format("MMMM Do, YYYY")}
            </option>
          </select>
          <br />
          <label htmlFor="description"> </label>
          <br />
          <input
            placeholder="Description"
            onChange={this.handleNoteChange}
            name="description"
            className="description"
            type="text"
            maxlength="40"
            value={this.state.note.description}
          />
          <br />
          <label htmlFor="content" />
          <br />
          <textarea
            placeholder="Content"
            onChange={this.handleNoteChange}
            name="content"
            className="content"
            type="text"
            maxlength="600"
            value={this.state.note.content}
          />
          <br />
          <input
            type="submit"
            name="Submit"
            className="submitNote"
            value="Add Note"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(NewNote);
