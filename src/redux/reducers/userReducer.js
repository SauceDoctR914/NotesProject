const initialState = {
  currentUser: {
    user: {},
    jwt: ""
  },
  users: [],
  notebooks: [],
  notes: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER": {
      return { ...state, currentUser: action.getUser };
    }
    case "GET_USERS": {
      return { ...state, users: action.users.data };
    }
    case "GET_NOTEBOOKS": {
      return { ...state, notebooks: action.notebooks.data };
    }
    case "GET_NOTES": {
      return { ...state, notes: action.notes.data };
    }
    case "EDIT_NOTE": {
      return { ...state, note: action.note.data };
    }
    case "DELETE_NOTE": {
      return {
        ...state,
        notes: state.notes.filter(note => note !== action.payload)
      };
    }

    default:
      return state;
  }
};
export default userReducer;
