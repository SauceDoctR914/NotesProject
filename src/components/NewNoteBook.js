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

  handleSubmit = (e, obj) => {
    e.preventDefault();
    this.postNoteBook(this.state.notebook, this.props.currentUser.id);
  };

  postNoteBook = (notebook, id) => {
    const URL = "http://localhost:3002/api/v1/notebooks";
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        notebook: {
          title: notebook.title,
          user_id: id
        }
      })
    }).then(res => res.json());
  };

  render() {
    console.log(this.props.currentUser, "guy");
    return (
      <div className="newnb-div">
        <form onSubmit={e => this.handleSubmit(e, this.state)}>
          <label htmlFor="title"> Note Title: </label>
          <br />
          <input
            onChange={this.handleNoteBookChange}
            name="title"
            id="title"
            type="text"
            // value={this.state.notebook.title || ""}
          />
          <br />

          <input type="submit" name="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(NewNoteBook);
