import { SET_META, SET_ITEMS } from '../../constants';

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


export {
  setMetaFor,
  setItemsFor
}