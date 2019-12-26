import { 
  SET_ITEMS,
  SET_META
} from '../../constants';

const initialDataState = {
  itemsList: [],
  itemsMeta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  }
};

const itemsDataReducerFor = (prefix) => {
  const itemsDataReducer = (state = initialDataState, action) => {
    const { type, payload } = action;
    
    switch (type) {
      case prefix + SET_ITEMS:
        return { ...state, itemsList: payload };

      case prefix + SET_META:
        return { ...state, itemsMeta: payload };

      default:
        return state;
    }
  };
  return itemsDataReducer;
};

export default itemsDataReducerFor;
