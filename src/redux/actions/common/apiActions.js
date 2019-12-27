import {
  // LOAD_STATUS,
  // SAVE_STATUS,
} from '../../constants';

import {
  // handleError,
  isSuccessStatus,
  getResponseMessage,
} from 'services/api/api_helpers';
import { toastr } from 'react-redux-toastr';
import { push as routerPush } from 'react-router-redux';

import { api } from 'services/api';
import { clearAuth } from '../authActions';
import { setLoadingStatusFor, setSavingStatusFor } from './statusActions';
import { setMetaFor, setItemsFor } from './itemsDataActions';


const handleError = (error, { dispatch, reject=null, prefix }) => {
  const message = getResponseMessage(error);

  if (error.response) {
    if (error.response.status === 401) {
      dispatch(clearAuth());
      dispatch(routerPush('/auth/sign-in'));
      dispatch(setLoadingStatusFor(prefix)(false));
      dispatch(setSavingStatusFor(prefix)(false));
      toastr.error(message || 'Ваша сессия устарела', 'пожалуйста авторизируйтесь', { timeOut: 0 });
      return;
    }
  }
  if (reject) reject()
  dispatch(setLoadingStatusFor(prefix)(false));
  dispatch(setSavingStatusFor(prefix)(false));
  toastr.error('Ошибка', message || error.message, { timeOut: 0 });
};

// ---------------------------

const fetchItemsFor = (prefix, url) => {
  const fetchItems = options => {
    return dispatch => {
      dispatch(setLoadingStatusFor(prefix)(true));  

      api('GET',url, options)
        .then(response => {
          // console.log(response)
          
          if (isSuccessStatus(response)) {
            dispatch(setItemsFor(prefix)(response.data.data));

            if (response.data.meta) {
              dispatch(setMetaFor(prefix)(response.data.meta));
            }

          } else {
            const message = getResponseMessage(response);
            toastr.error('Ошибка', message || 'неправильный формат данных ответа', {
              timeOut: 0
            });
          }
          dispatch(setLoadingStatusFor(prefix)(false));
        })
        .catch(error => {
          console.log(error)
          handleError(error, {dispatch:dispatch, prefix:prefix});
        });
    };
  };
  return fetchItems;
};

const saveItemFor = (prefix, payloadUrl) => {
  const saveItem = payload => {
    return dispatch => {
      dispatch(setSavingStatusFor(prefix)(true));  
      
      let options;
      if (payload.data.id) {
        options = {
          method: 'PUT',
          url: `${payloadUrl}/${payload.data.id}`,
          resultMessage: 'сохранен',
        }
      } else {
        options = {
          method: 'POST',
          url: payloadUrl,
          resultMessage: 'создан',
        }
      }
      const { method, url, resultMessage } = options;
      
      return new Promise((resolve, reject) => {
        api(method, url, payload)
          .then(response => {
            // handleSetItemsResponse(response, settings);
            if (isSuccessStatus(response)) {
         
              // ------Update AuthUser-----
              /*let copyAuthUser = Object.assign({}, store.getState().auth.authUser);
              if (savedUser.id === copyAuthUser.id) {
                savedUser.avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/snowshade/128.jpg';
                dispatch(setAuthUser(savedUser));  
              }*/
              // ---------------------------

              toastr.success('', `Элемент ${resultMessage}`);
              resolve(response)
            } else {
              reject()
              const message = getResponseMessage(response);
              toastr.error('Ошибка', message || 'неправильный формат данных ответа', {timeOut: 0});
            }
            dispatch(setSavingStatusFor(prefix)(false));
          })
          .catch(error => {
            handleError(error, {dispatch:dispatch, prefix:prefix, reject:reject});
          });
      })
    };
  };
  return saveItem;
};

const deleteItemFor = (prefix, url) => {
  const deleteItem = id => {
    return dispatch => {
      dispatch(setSavingStatusFor(prefix)(true));  

      return new Promise((resolve, reject) => {
        api('DELETE', `${url}/${id}`)
          .then(response => {
            if (isSuccessStatus(response)) {
              toastr.success('', 'Элемент успешно удален');
            } else {
              const message = getResponseMessage(response);
              toastr.error('Ошибка', message || 'неправильный формат данных ответа', { timeOut: 0 });
            }
            if (resolve) resolve()
            dispatch(setSavingStatusFor(prefix)(false));
          })
          .catch(error => { handleError(error, {dispatch:dispatch, prefix:prefix, reject:reject}) });
      })
    }
  }
  return deleteItem
};

export {
  fetchItemsFor,
  saveItemFor,
  deleteItemFor
}