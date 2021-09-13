import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3065/api',
});

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default client;
