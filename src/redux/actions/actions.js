export const getUser = currentUser => ({
  type: "GET_USER",
  payload: currentUser
});

export const getUsers = users => ({ type: "GET_USERS", payload: users.data });
export const getNoteBooks = notebooks => ({
  type: "GET_NOTEBOOKS",
  payload: notebooks
});

export const fetchNoteBooks = () => {
  return dispatch => {
    return fetch("http://localhost:3002/api/v1/notebooks", {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(notebooks => dispatch({ type: "GET_NOTEBOOKS", notebooks }))
      .catch(console.error);
  };
};

export const fetchNotes = () => {
  return dispatch => {
    return fetch("http://localhost:3002/api/v1/notes", {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(notes => dispatch({ type: "GET_NOTES", notes }))
      .catch(console.error);
  };
};

export const getNote = id => {
  return dispatch => {
    return fetch(`http://localhost:3002/api/v1/notes/${id}`, {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(note => dispatch({ type: "GET_NOTE", note }))
      .catch(console.error);
  };
};

export const editNote = id => {
  return {
    type: "EDIT_NOTE",
    id
  };
};
