/* SELECTORS */

export const getRequest = ({ requests }, name) => requests[name];

/* ACTIONS */
const createActionName = (actionName) => `app/request/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');

/* ACTION CREATORS */

export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });

/* THUNKS */

/* INITIAL STATE */

const initialState = {};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...statePart,
        [action.payload.name]: { pending: true, success: false },
      };
    case END_REQUEST:
      return {
        ...statePart,
        [action.payload.name]: { pending: false, success: true },
      };
    default:
      return statePart;
  }
}
