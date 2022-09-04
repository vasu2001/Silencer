import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const baseURL = 'http://192.168.0.179:8080/';

const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
});

export const setAuthorizationToken = async (token) => {
  if (token) {
    await AsyncStorage.setItem('authToken', token);
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    await AsyncStorage.removeItem('authToken');
    delete axiosInstance.defaults.headers.common['authorization'];
  }
};

export default axiosInstance;
