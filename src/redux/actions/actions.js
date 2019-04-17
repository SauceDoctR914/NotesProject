export const setUser = currentUser => ({
  type: "SET_USER",
  payload: currentUser
});
export const logOutUser = currentUser => ({
  type: "LOGOUT_USER",
  payload: currentUser
});

export const fetchNoteBooks = () => {
  let token = "Bearer " + localStorage.getItem("jwt");
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

export const getUsers = () => {
  return dispatch => {
    return fetch("http://localhost:3002/api/v1/users", {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(users => dispatch({ type: "GET_USERS", users }))
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

export const editNote = (note, id) => {
  return dispatch => {
    return fetch(`http://localhost:3002/api/v1/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        note: {
          title: note.title,
          created: note.created,
          description: note.description,
          content: note.content,
          notebook_id: note.notebookID,
          user_id: note.userID
        }
      })
    })
      .then(res => res.json())
      .then(note => dispatch({ type: "EDIT_NOTE", note }))
      .catch(console.error);
  };
};

export const deleteNote = (note, id) => {
  return dispatch => {
    const URL = `http://localhost:3002/api/v1/notes/${id}`;
    fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      }
    }).then(note => dispatch({ type: "DELETE_NOTE", note }));
  };
};

export const editNoteBook = (notebook, id) => {
  return dispatch => {
    return fetch(`http://localhost:3002/api/v1/notebook/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        notebook: {
          title: notebook.title
        }
      })
    })
      .then(res => res.json())
      .then(notebook => dispatch({ type: "EDIT_NOTEBOOK", notebook }))
      .catch(console.error);
  };
};

export const login = data => {
  return dispatch => {
    return fetch("http://localhost:3002/api/user_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        auth: {
          email: data.auth.email,
          password: data.auth.password
        }
      })
    })
      .then(res => res.json())
      .then(user => {
        console.log(user, "LOG IN");
        localStorage.setItem("jwt", user.jwt);
        dispatch(setUser(user));
      })
      .catch(e => console.error(e));
  };
};
