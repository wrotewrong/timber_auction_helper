import { API_URL } from '../config';
import { startRequest, endRequest } from './requestRedux';

/* SELECTORS */
export const getCatalog = ({ catalogRedux }) => catalogRedux.data;

/* ACTIONS */
const createActionName = (actionName) => `app/catalog/${actionName}`;
export const LOAD_CATALOG = createActionName('LOAD_CATALOG');
export const DELETE_DATA = createActionName('DELETE_DATA');

/* ACTION CREATORS */
export const loadCatalog = (payload) => ({ payload, type: LOAD_CATALOG });
export const deleteAllCatalogData = (payload) => ({
  payload,
  type: DELETE_DATA,
});

/* THUNKS */
export const loadCatalogRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'CATALOG_REQUEST' }));
    await fetch(`${API_URL}/catalog`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadCatalog(res));
        dispatch(endRequest({ name: 'CATALOG_REQUEST' }));
      });
  };
};

export const importCatalogRequest = (catalog) => {
  const fd = new FormData();
  fd.append('uploadedFile', catalog);

  return async (dispatch) => {
    dispatch(startRequest({ name: 'CATALOG_REQUEST' }));
    const options = {
      method: 'POST',
      body: fd,
    };

    await fetch(`${API_URL}/catalog/import`, options)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(loadCatalog(res));
        dispatch(endRequest({ name: 'CATALOG_REQUEST' }));
      });
  };
};

export const deleteAllCatalogDataRequest = () => {
  return async (dispatch) => {
    await fetch(`${API_URL}/catalog`, { method: 'DELETE' })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(deleteAllCatalogData(res));
      });
  };
};

/* INITIAL STATE */

const initialState = {
  data: {},
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CATALOG:
      return { ...statePart, data: action.payload };
    case DELETE_DATA:
      return { ...statePart, data: action.payload };
    default:
      return statePart;
  }
}
