export const API_URL =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:8001/api';
