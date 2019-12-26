import {
  // LOAD_STATUS,
  // SAVE_STATUS,
} from '../../constants';

import { api } from 'services/api';
import { setLoadingStatusFor, setSavingStatusFor } from './statusActions';

const fetchItemsFor = (prefix, url) => {
  // const setLoadStatus = setLoadingStatusFor(prefix);

  const fetchItems = options => {
    return dispatch => {
      // setLoadStatus(true)
      dispatch(setLoadingStatusFor(prefix)(true));  

      // dispatch({ type: LOAD_STATUS, payload: true });

     /* const settings = { 

        types: {
          itemsAction: types.USERS_SET_ITEMS,
          statusEnd: types.USERS_REQUEST_END,
          setMeta: types.USERS_SET_META
        }
      };*/
      // console.log(payload)
      // console.log('ok ', prefix)

      api('GET',url, options)
        .then(response => {
          console.log(response)
          // handleGetItemsResponse(response, settings);
        })
        .catch(error => {
          console.log(error)
          // handleError(error, settings);
        });
    };
  };
  return fetchItems;
};

export {
  fetchItemsFor,
}