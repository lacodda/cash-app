import { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.CLIENT_ROOT_API,
  headers: {
    'Content-type': 'application/json',
  },
});

export default httpClient;
