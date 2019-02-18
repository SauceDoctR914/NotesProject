import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Moment from "moment";
import { editNoteBook } from "../redux/actions/actions";
import { connect } from "react-redux";

class EditNoteBook extends Component {
  componentDidMount() {
    const { notebook } = this.props.location.state;
  }
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
            onChange={this.handleNoteBookChange}
            name="title"
            id="title"
            type="text"
            value={this.state.notebook.title}
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
    notebook: state.notebook.filter(
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
  )
)(EditNoteBook);
