import { SET_META, SET_ITEMS, SET_FILTERS } from '../../constants';

const setMetaFor = prefix => {
  const setMeta = meta => {
    // console.log(prefix, meta)
    return {
      type: prefix + SET_META,
      payload: meta
    }
  };
  return setMeta;
};

const setItemsFor = prefix => {
  const setItems = items => {
    // console.log(prefix, meta)
    return {
      type: prefix + SET_ITEMS,
      payload: items
    }
  };
  return setItems;
};

const setFiltersFor = prefix => {
  const setFilters = filters => {
    // console.log(prefix, filters)
    return {
      type: prefix + SET_FILTERS,
      payload: filters
    }
  };
  return setFilters;
};


export {
  setMetaFor,
  setItemsFor,
  setFiltersFor
}