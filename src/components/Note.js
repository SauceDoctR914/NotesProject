import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNote } from "../redux/actions/actions";
import EditNote from "./EditNote";
class Note extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="individual-note">
          <div className="notetitle-div">
            {this.props.note.attributes.title}
          </div>
          <br />
          <div className="date-div">{this.props.note.attributes.created}</div>
          <br />
          <div className="desc-div">
            {this.props.note.attributes.description}
          </div>
          <br />
          <div className="content-div">
            {this.props.note.attributes.content}
          </div>
          <div className="button">
            <Link
              to={{
                pathname: `/homepage/notes/${this.props.note.id}/editnote`
              }}
            >
              <button className="edit-button"> Make Changes</button>
            </Link>
            <button
              className="delete-note"
              onClick={(e, note, id) =>
                window.confirm("Are you sure you wish to delete this item?") &&
                this.props.deleteNote(e, this.props.note, this.props.note.id)
              }
            >
              Delete Note
            </button>
            <Link
              to={{
                pathname: `/homepage/notes/${this.props.note.id}/translate`
              }}
            >
              <button className="translate-button"> Translate Content</button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// state.notes.filter(note => note.id === id);

export default withRouter(Note);
