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
    this.setState({ noteBook: newNoteBook });
  };

  // handleDateChange = event => {
  //   this.setState({ created: event.target.value });
  // };

  render() {
    return (
      <div className="newnb-div">
        <form onSubmit={e => this.props.handleSubmit(e, this.state)}>
          <label htmlFor="title"> NoteBook Title: </label>
          <br />
          <input
            onChange={this.handleNoteBookChange}
            name="title"
            id="title"
            type="text"
            value={this.state.title}
          />
          <br />

          <input type="submit" name="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(NewNoteBook);
