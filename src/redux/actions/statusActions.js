import { SAVE_STATUS } from '../constants';


const setLoadingStatusFor = (prefix) => { 
  const setLoadingStatus = (isLoading) => {
    return {
      type: prefix + SAVE_STATUS,
      payload: isLoading
    }
  };
  return setLoadingStatus;
};