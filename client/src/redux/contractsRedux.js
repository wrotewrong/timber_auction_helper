import { API_URL } from '../config';
import { importStatusRequest } from './statusRedux';

/* SELECTORS */
export const getOffers = ({ contractsRedux }) => contractsRedux.offers;
export const getCompanies = ({ contractsRedux }) => contractsRedux.companies;

/* ACTIONS */
const createActionName = (actionName) => `app/offers/${actionName}`;
export const IMPORT_OFFERS = createActionName('IMPORT_OFFERS');
export const LOAD_OFFERS = createActionName('LOAD_OFFERS');
export const IMPORT_COMPANIES = createActionName('IMPORT_COMPANIES');
export const LOAD_COMPANIES = createActionName('LOAD_COMPANIES');
export const ESTIMATE_WINNER = createActionName('ESTIMATE_WINNER');

/* ACTION CREATORS */
// export const importOffers = (payload) => ({ payload, type: IMPORT_OFFERS });
export const loadOffers = (payload) => ({ payload, type: LOAD_OFFERS });
// export const importCompanies = (payload) => ({
//   payload,
//   type: IMPORT_COMPANIES,
// });
export const loadCompanies = (payload) => ({
  payload,
  type: LOAD_COMPANIES,
});
export const estimateWinner = (payload) => ({
  payload,
  type: ESTIMATE_WINNER,
});

/* THUNKS */
export const loadOffersRequest = () => {
  return async (dispatch) => {
    await fetch(`${API_URL}/contracts/offers`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => dispatch(loadOffers(res)));
  };
};

export const importOffersRequest = (offers) => {
  const fd = new FormData();
  fd.append('uploadedFile', offers);

  return async (dispatch) => {
    const options = {
      method: 'POST',
      body: fd,
    };

    await fetch(`${API_URL}/contracts/importOffers`, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(loadOffers(res));
      });
  };
};

// export const getOffersStatusRequest = () => {
//   return (dispatch) => {
//     fetch(`${API_URL}/contracts/offersStatus`, { method: 'GET' })
//       .then((res) => {
//         if (res.status === 200) {
//           return res.json();
//         }
//       })
//       .then((res) => {
//         dispatch(importOffers(res?.message));
//       });
//   };
// };

export const loadCompaniesRequest = () => {
  return async (dispatch) => {
    await fetch(`${API_URL}/contracts/companies`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => dispatch(loadCompanies(res)));
  };
};

export const importCompaniesRequest = (companies) => {
  const fd = new FormData();
  fd.append('uploadedFile', companies);

  return async (dispatch) => {
    const options = {
      method: 'POST',
      body: fd,
    };

    await fetch(`${API_URL}/contracts/importCompanies`, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(loadCompanies(res));
      });
  };
};

// export const getCompaniesStatusRequest = () => {
//   return (dispatch) => {
//     fetch(`${API_URL}/contracts/companiesStatus`, { method: 'GET' })
//       .then((res) => {
//         if (res.status === 200) {
//           return res.json();
//         }
//       })
//       .then((res) => {
//         dispatch(importCompanies(res?.message));
//       });
//   };
// };

export const estimateWinnerRequest = () => {
  return (dispatch) => {
    fetch(`${API_URL}/contracts/estimate`, { method: 'GET' })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(estimateWinner(res?.message));
        dispatch(importStatusRequest());
      });
  };
};

/* INITIAL STATE */

const initialState = {
  offers: {},
  companies: {},
  contractStatus: '',
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    // case IMPORT_OFFERS:
    //   return { ...statePart, offers: action.payload };
    case LOAD_OFFERS:
      return { ...statePart, offers: action.payload };
    // case IMPORT_COMPANIES:
    //   return { ...statePart, companies: action.payload };
    case LOAD_COMPANIES:
      return { ...statePart, companies: action.payload };
    case ESTIMATE_WINNER:
      return { ...statePart, contractStatus: action.payload };
    default:
      return statePart;
  }
}
