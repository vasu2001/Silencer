import axios, {AxiosInstance} from 'axios';
import {PermissionsAndroid} from 'react-native';

const baseURL: string = 'http://192.168.0.179:8080/';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000,
});

export default axiosInstance;
