import axios from 'axios';
const myIP = 'localhost';//192.168.0.104'
const api = axios.create({
  baseURL: `http://${myIP}:3000`, // Replace with your backend IP and port
  timeout: 5000,
});

export default api;
