import { AsyncStorage } from 'react-native';
import axios from 'axios';

const logIn = async function (username, password) {
  const response = await axios.post('auth/login', {
    username,
    password,
  });
  if (response.data.status !== 'success') {
    throw 'invalid login';
  }
  const token = response.headers.authorization;
  if (token) {
    await AsyncStorage.setItem('userToken', token);
  }
  return response;
};

const getUser = async function () {
  return await axios.request({
    method: 'get',
    url: '/auth/user',
    headers: {
      'Authorization': `Bearer ${oldToken}`,
    },
  });
};

const refresh = async function () {
  const oldToken = await AsyncStorage.getItem('userToken');
  const response = await axios.request({
    method: 'get',
    url: '/auth/refresh',
    headers: {
      'Authorization': `Bearer ${oldToken}`,
    },
  });
  const token = response.headers.authorization.substr(7);
  await AsyncStorage.setItem('userToken', token);
};

const loadPosts = async function () {
  const token = await AsyncStorage.getItem('userToken');
  return await axios.request({
    method: 'get',
    url: '/posts',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const storePost = async function (body) {
  const token = await AsyncStorage.getItem('userToken');
  return await axios.request({
    method: 'post',
    url: '/posts',
    data: {
      body,
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export {
  logIn,
  getUser,
  refresh,
  loadPosts,
  storePost,
};
