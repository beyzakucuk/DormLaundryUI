import axios from 'axios';

export default axios.create({
  baseURL: `https://localhost:7020/api`
});