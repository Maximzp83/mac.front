import { 
  SET_ITEMS,
  SET_META,
  SET_FILTERS
} from '../../constants';

const initialDataState = {
  itemsList: [],
  itemsFilters: {
    isClient: null,
    isActive: null,
    max: 10,
    page: 1
  },
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

      case prefix + SET_FILTERS:
        return { ...state, itemsFilters: payload };

      default:
        return state;
    }
  };
  return itemsDataReducer;
};

export default itemsDataReducerFor;
