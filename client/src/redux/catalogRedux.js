/* SELECTORS */

/* ACTIONS */

/* ACTION CREATORS */

/* THUNKS */

/* INITIAL STATE */

const initialState = {
  data: [{ test: 'works' }],
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
