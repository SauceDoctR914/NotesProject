import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Moment from "moment";
class NewNote extends Component {
  render() {
    return (
      <div>
        <h3>Add a Note:</h3>
        <form
          className="newNoteForm"
          onSubmit={e => this.props.handleSubmit(e, this.state)}
        >
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
