import { API_URL } from '../config';

/* SELECTORS */
export const getOffers = ({ contractsRedux }) => contractsRedux.offers;
export const getCompanies = ({ contractsRedux }) => contractsRedux.companies;

/* ACTIONS */
const createActionName = (actionName) => `app/offers/${actionName}`;
export const IMPORT_OFFERS = createActionName('IMPORT_OFFERS');
export const IMPORT_COMPANIES = createActionName('IMPORT_COMPANIES');

/* ACTION CREATORS */
export const importOffers = (payload) => ({ payload, type: IMPORT_OFFERS });
export const importCompanies = (payload) => ({
  payload,
  type: IMPORT_COMPANIES,
});

/* THUNKS */
export const importOffersRequest = (offers) => {
  const fd = new FormData();
  fd.append('uploadedFile', offers);

  return (dispatch) => {
    const options = {
      method: 'POST',
      body: fd,
    };

    fetch(`${API_URL}/contracts/importOffers`, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(importOffers(res?.message));
      });
  };
};

export const getOffersStatusRequest = (offers) => {
  return (dispatch) => {
    fetch(`${API_URL}/contracts/offersStatus`, { method: 'GET' })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(importOffers(res?.message));
      });
  };
};

export const importCompaniesRequest = (companies) => {
  const fd = new FormData();
  fd.append('uploadedFile', companies);

  return (dispatch) => {
    const options = {
      method: 'POST',
      body: fd,
    };

    fetch(`${API_URL}/contracts/importCompanies`, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(importCompanies(res?.message));
      });
  };
};

export const getCompaniesStatusRequest = (companies) => {
  return (dispatch) => {
    fetch(`${API_URL}/contracts/companiesStatus`, { method: 'GET' })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(importCompanies(res?.message));
      });
  };
};

/* INITIAL STATE */

const initialState = {
  offers: '',
  companies: '',
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case IMPORT_OFFERS:
      return { ...statePart, offers: action.payload };
    case IMPORT_COMPANIES:
      return { ...statePart, companies: action.payload };
    default:
      return statePart;
  }
}
