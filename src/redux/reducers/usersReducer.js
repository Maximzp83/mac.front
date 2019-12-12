import { types } from "../actions/usersActions";

const initialState = {
  usersLoading: false,
  usersList: [],
  usersStatus: 'ready',
  usersFilter: {
    isClient: null,
    isActive: null
  }
};

export default function(state = initialState, action) {
      // console.log(action)

  switch (action.type) {

    case types.ITEMS_STATUS: {
      return { ...state, 
        usersLoading: action.payload.isLoading,
        usersStatus: action.payload.status
      }
    }

    case types.SET_ITEMS: {
      return { ...state, usersList: action.payload }
    }

    case types.ITEMS_CLEAR: {
      return { ...state, usersList: [] }      
    }

    case types.SET_FILTER: {
      return { ...state, usersFilter: action.payload }
    }

    default:
      return state;
  }
}