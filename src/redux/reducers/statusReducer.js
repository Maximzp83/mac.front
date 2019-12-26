const initialPaginationState = {
  startElement: 0,
  pageSize: 100,
  count: 0,
};
const paginationReducerFor = (prefix) => {
  const paginationReducer = (state = initialPaginationState, action) => {
    const { type, payload } = action;
    switch (type) {
      case prefix + types.SET_PAGINATION:
        const {
          startElement,
          pageSize,
          count,
        } = payload;
        return Object.assign({}, state, {
          startElement,
          pageSize,
          count,
        });
      default:
        return state;
    }
  };
  return paginationReducer;
};
// example usages
const usersReducer = combineReducers({
  usersData: usersDataReducer,
  paginationData: paginationReducerFor('USERS_'),
});
const domainsReducer = combineReducers({
  domainsData: domainsDataReducer,
  paginationData: paginationReducerFor('DOMAINS_'),
});