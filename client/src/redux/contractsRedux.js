import { API_URL } from '../config';
import { importStatusRequest } from './statusRedux';
import { startRequest, endRequest } from './requestRedux';

/* SELECTORS */
export const getOffers = ({ contractsRedux }) => contractsRedux.offers;
export const getCompanies = ({ contractsRedux }) => contractsRedux.companies;
export const getContracts = ({ contractsRedux }) => contractsRedux.contracts;

/* ACTIONS */
const createActionName = (actionName) => `app/offers/${actionName}`;
export const IMPORT_OFFERS = createActionName('IMPORT_OFFERS');
export const LOAD_OFFERS = createActionName('LOAD_OFFERS');
export const IMPORT_COMPANIES = createActionName('IMPORT_COMPANIES');
export const LOAD_COMPANIES = createActionName('LOAD_COMPANIES');
export const LOAD_CONTRACTS = createActionName('LOAD_CONTRACTS');
export const LOAD_CONTRACTS_MESSAGE = createActionName(
  'LOAD_CONTRACTS_MESSAGE'
);
export const DELETE_DATA = createActionName('DELETE_DATA');

/* ACTION CREATORS */
export const loadOffers = (payload) => ({ payload, type: LOAD_OFFERS });
export const loadCompanies = (payload) => ({
  payload,
  type: LOAD_COMPANIES,
});
export const loadContracts = (payload) => ({
  payload,
  type: LOAD_CONTRACTS,
});
export const loadContractsMessage = (payload) => ({
  payload,
  type: LOAD_CONTRACTS_MESSAGE,
});
export const deleteAllContractsData = (payload) => ({
  payload,
  type: DELETE_DATA,
});

/* THUNKS */
export const loadOffersRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'OFFERS_REQUEST' }));
    await fetch(`${API_URL}/contracts/offers`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadOffers(res));
        dispatch(endRequest({ name: 'OFFERS_REQUEST' }));
      });
  };
};

export const importOffersRequest = (offers) => {
  const fd = new FormData();
  fd.append('uploadedFile', offers);

  return async (dispatch) => {
    dispatch(startRequest({ name: 'OFFERS_REQUEST' }));
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
        dispatch(endRequest({ name: 'OFFERS_REQUEST' }));
      });
  };
};

export const loadCompaniesRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'OFFERS_REQUEST' }));
    await fetch(`${API_URL}/contracts/companies`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadCompanies(res));
        dispatch(endRequest({ name: 'OFFERS_REQUEST' }));
      });
  };
};

export const importCompaniesRequest = (companies) => {
  const fd = new FormData();
  fd.append('uploadedFile', companies);

  return async (dispatch) => {
    dispatch(startRequest({ name: 'OFFERS_REQUEST' }));
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
        dispatch(endRequest({ name: 'OFFERS_REQUEST' }));
      });
  };
};

export const estimateWinnerRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'OFFERS_REQUEST' }));
    await fetch(`${API_URL}/contracts/estimate`, { method: 'GET' })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(importStatusRequest());
        dispatch(endRequest({ name: 'OFFERS_REQUEST' }));
      });
  };
};

export const addContracts = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'CONTRACTS_REQUEST' }));
    await fetch(`${API_URL}/contracts/add`, { method: 'POST' })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(loadContracts(res));
        dispatch(endRequest({ name: 'CONTRACTS_REQUEST' }));
      });
  };
};

export const loadContractsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'CONTRACTS_REQUEST' }));
    await fetch(`${API_URL}/contracts`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadContracts(res));
        dispatch(endRequest({ name: 'CONTRACTS_REQUEST' }));
      });
  };
};

export const deleteAllContractsDataRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'REMOVE_REQUEST' }));
    await fetch(`${API_URL}/contracts`, { method: 'DELETE' })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(deleteAllContractsData(res));
        dispatch(endRequest({ name: 'REMOVE_REQUEST' }));
      });
  };
};

/* INITIAL STATE */

const initialState = {
  offers: {},
  companies: {},
  contracts: {},
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_OFFERS:
      return { ...statePart, offers: action.payload };
    case LOAD_COMPANIES:
      return { ...statePart, companies: action.payload };
    case LOAD_CONTRACTS:
      return { ...statePart, contracts: action.payload };
    case LOAD_CONTRACTS_MESSAGE:
      return { ...statePart, contracts: action.payload };
    case DELETE_DATA:
      return {
        ...statePart,
        offers: {
          message: action.payload.message,
          offers: action.payload.offers,
        },
        companies: {
          message: action.payload.message,
          companies: action.payload.companies,
        },
        contracts: {
          message: action.payload.message,
          contracts: action.payload.contracts,
        },
      };
    default:
      return statePart;
  }
}
