import {
  // LOAD_STATUS,
  // SAVE_STATUS,
} from '../../constants';

import {
  handleError,
  isSuccessStatus,
  getResponseMessage,
}  from 'services/api/api_helpers';
import { toastr } from 'react-redux-toastr';

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
          
          if (isSuccessStatus(response)) {
            dispatch(setItemsFor(prefix)(response.data.data));

            /*if (response.data.meta) {
              dispatch({
                type: types.setMeta,
                payload: response.data.meta
              });
            } */ 
          } else {
            const message = getResponseMessage(response);
            toastr.error('Ошибка', message || 'неправильный формат данных ответа', {
              timeOut: 0
            });
          }
          dispatch(setLoadingStatusFor(prefix)(true));

          // handleGetItemsResponse(response, settings);
        })
        .catch(error => {
          console.log(error)
          dispatch(setLoadingStatusFor(prefix)(true));  
          // handleError(error, settings);
        });
    };
  };
  return fetchItems;
};

export {
  fetchItemsFor,
}