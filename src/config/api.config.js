const host = 'http://localhost';
const port = 3000;
const api = `${host}:${port}/api`;

export default {
  host,
  port,
  api,
  endpoints: {
    restaurants: `${api}/restaurants`,
  },
};
