import { types } from "../actions/usersActions";

const initialState = {
  usersLoading: false,
  usersList: [],
  status: 'ready'
};

export default function(state = initialState, action) {
      // console.log(action)

  switch (action.type) {

    case types.ITEMS_STATUS: {
      return { ...state, 
        usersLoading: action.payload.isLoading,
        status: action.payload.status
      }
    }

    case types.SET_ITEMS: {
      return { ...state, usersList: action.payload.users }
    }

    case types.ITEMS_CLEAR: {
      return { ...state, usersList: [] }      
    }

    default:
      return state;
  }
}