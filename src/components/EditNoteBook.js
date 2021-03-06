import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Moment from "moment";
import { editNoteBook } from "../redux/actions/actions";
import { connect } from "react-redux";

class EditNoteBook extends Component {

  state = {
    notebook: {
      id: this.props.notebook.id,
      title: this.props.notebook.title
    }
  };

  handleNoteChange = e => {
    const newNote = { ...this.state.note, [e.target.name]: e.target.value };
    this.setState({ note: newNote });
  };

  handleSubmit = (e, obj) => {
    e.preventDefault();
    this.props.editNoteBook(this.state.notebook.title, this.state.notebook.id);
    this.props.history.push(`/homepage/`);
    window.location.reload();
  };

  render() {
    console.log(this.props, "9000");
    return (
      <div>
        <form
          className="edit-nb-form"
          onSubmit={e => this.handleSubmit(e, this.state)}
        >
          <label htmlFor="title"> Note Title: </label>
          <br />
          <input
            className="title-nb-edit"
            maxlength="20"
            onChange={this.handleNoteBookChange}
            name="title"
            id="title"
            type="text"
            value={this.state.notebook.title}
            required
          />
          <br />
          <input type="submit" name="Submit" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state, "celestino");
  return {
    notebook: state.notebooks.filter(
      notebook => notebook.id === ownProps.match.params.id
    )[0]
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editNoteBook: notebook =>
      dispatch(editNoteBook(notebook, ownProps.match.params.id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditNoteBook)
);
