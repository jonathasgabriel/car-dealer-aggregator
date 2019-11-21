import axios from 'axios';

const api = axios.create({
  baseURL: 'http://4vendas.com/BuscadorWeb/api/v1/',
});

export default api;
