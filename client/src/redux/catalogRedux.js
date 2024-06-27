import { API_URL } from '../config';

/* SELECTORS */
export const getCatalog = ({ catalogRedux }) => catalogRedux.data;

/* ACTIONS */
const createActionName = (actionName) => `app/catalog/${actionName}`;
export const LOAD_CATALOG = createActionName('LOAD_CATALOG');

/* ACTION CREATORS */
export const loadCatalog = (payload) => ({ payload, type: LOAD_CATALOG });

/* THUNKS */
export const loadCatalogRequest = () => {
  return async (dispatch) => {
    await fetch(`${API_URL}/catalog`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadCatalog(res));
      });
  };
};

export const importCatalogRequest = (catalog) => {
  const fd = new FormData();
  fd.append('uploadedFile', catalog);

  return async (dispatch) => {
    const options = {
      method: 'POST',
      body: fd,
    };

    await fetch(`${API_URL}/catalog/import`, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(loadCatalog(res));
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
    default:
      return statePart;
  }
}
