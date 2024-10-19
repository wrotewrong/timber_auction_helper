import { API_URL } from '../config';

/* SELECTORS */
export const getStatus = ({ statusRedux }) => statusRedux.status;

/* ACTIONS */
const createActionName = (actionName) => `app/status/${actionName}`;
export const IMPORT_STATUS = createActionName('IMPORT_STATUS');

/* ACTION CREATORS */
export const importStatus = (payload) => ({ payload, type: IMPORT_STATUS });

/* THUNKS */
export const importStatusRequest = () => {
  return (dispatch) => {
    fetch(`${API_URL}/status`, { method: 'GET' })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(importStatus(res));
      });
  };
};

/* INITIAL STATE */

const initialState = {};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case IMPORT_STATUS:
      return { ...statePart, status: action.payload };
    default:
      return statePart;
  }
}
