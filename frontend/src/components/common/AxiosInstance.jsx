import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://learn-hub-1.onrender.com', 
});

export default axiosInstance;
