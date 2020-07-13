import axios, {AxiosInstance} from 'axios';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const baseURL: string = 'http://192.168.0.179:8080/';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000,
});

export const setAuthorizationToken = async (
  token?: string | null,
): Promise<void> => {
  if (token) {
    await AsyncStorage.setItem('authToken', token);
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    await AsyncStorage.removeItem('authToken');
    delete axiosInstance.defaults.headers.common['authorization'];
  }
};

export default axiosInstance;
