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
    this.setState({ notebook: newNoteBook });
  };

  // handleSubmit = (e, obj) => {
  //   e.preventDefault();
  //   this.props.handleNoteBookSubmit(obj);
  // };
  render() {
    return (
      <div className="newnb-div">
        <form onSubmit={e => this.props.handleNoteBookSubmit(e, this.state)}>
          <h3 className="createNB">Create A Note Book</h3>
          <br />
          <input
            placeholder="NoteBook Title"
            onChange={this.handleNoteBookChange}
            name="title"
            id="newnb-title"
            type="text"
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
      </div>
    );
  }
}

export default withRouter(NewNoteBook);
