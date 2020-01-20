import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Moment from "moment";
class NewNoteBook extends Component {
  state = {
    notebook: {
      title: ""
    }
  };

  handleNoteBookChange = e => {
    const newNoteBook = {
      ...this.state.notebook,
      [e.target.name]: e.target.value
    };
    console.log(e.target.value, "value")
    this.setState({ notebook: newNoteBook });
  };

  render() {
    return (
        <form
          className="newNbform"
          onSubmit={e => this.props.handleNoteBookSubmit(e, this.state)}
        >
          <h3 className="createNB">Create A Notebook</h3>
          <br />
          <input
            required
            placeholder="NoteBook Title"
            onChange={this.handleNoteBookChange}
            name="title"
            id="newnb-title"
            type="text"
            maxlength="20"
            value={this.state.title}
          />
          <br />

          <input
            type="submit"
            value="Add Notebook"
            name="Submit"
            className="submitNotebook"
          />
        </form>
    );
  }
}

export default withRouter(NewNoteBook);
