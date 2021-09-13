import axios from 'axios';

const anony = axios.create({
  baseURL: 'http://localhost:3065/api',
});

export default anony;
