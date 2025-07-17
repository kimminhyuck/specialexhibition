import axios from 'axios';

// axios 전역 기본 설정
axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// 요청 인터셉터 - 토큰 자동 추가
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API 요청:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
axios.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.config.method?.toUpperCase(), response.config.url);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    console.error('API 에러:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axios;