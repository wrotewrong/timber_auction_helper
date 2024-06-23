import { API_URL } from '../config';

/* SELECTORS */
export const getCatalog = ({ catalogRedux }) => catalogRedux.catalog;

/* ACTIONS */
const createActionName = (actionName) => `app/catalog/${actionName}`;
export const IMPORT_CATALOG = createActionName('IMPORT_CATALOG');

/* ACTION CREATORS */
export const importCatalog = (payload) => ({ payload, type: IMPORT_CATALOG });

/* THUNKS */
export const importCatalogRequest = (catalog) => {
  const fd = new FormData();
  fd.append('uploadedFile', catalog);

  return (dispatch) => {
    const options = {
      method: 'POST',
      body: fd,
    };

    fetch(`${API_URL}/catalog/import`, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(importCatalog(res?.message));
      });
  };
};

export const getCatalogStatusRequest = (catalog) => {
  return (dispatch) => {
    fetch(`${API_URL}/catalog/status`, { method: 'GET' })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(importCatalog(res?.message));
      });
  };
};

/* INITIAL STATE */

const initialState = {
  catalog: '',
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case IMPORT_CATALOG:
      return { ...statePart, catalog: action.payload };
    default:
      return statePart;
  }
}
