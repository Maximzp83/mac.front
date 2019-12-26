import { LOAD_STATUS, SAVE_STATUS } from '../../constants';

const setMetaFor = prefix => {
  const setMeta = isLoading => {
    // console.log(prefix, isLoading)
    return {
      type: prefix + LOAD_STATUS,
      payload: isLoading
    }
  };
  return setMeta;
};

const setSavingStatusFor = prefix => {
  const setSavingStatus = isSaving => {
    return {
      type: prefix + SAVE_STATUS,
      payload: isSaving
    }
  };
  return setSavingStatus;
};

export {
  setMetaFor,
  setSavingStatusFor
}