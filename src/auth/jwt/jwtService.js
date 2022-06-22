import axios from "axios";
import jwtDefaultConfig from "./jwtDefaultConfig";
// import { toast, Slide } from 'react-toastify'
// import ToastContent from '../../../views/ui-elements/toast'

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false;

  // ** For Refreshing Token
  subscribers = [];

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };
    
    axios.defaults.baseURL = "http://dev-api.riyowork.com/api";

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        if (config.url === this.jwtConfig.refreshEndpoint) {
          config.headers.Authorization = `${
            this.jwtConfig.tokenType
          } ${this.getRefreshToken()}`;
        } else {
          // ** Get token from localStorage
          const accessToken = this.getToken();

          // ** If token is present add it to request's Authorization Header
          if (accessToken) {
            // ** eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // ** const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;

        // ** if (status === 400) {
        //     if (response && response.status === 400) {
        // toast.error(
        //   <ToastContent message="Action can't perform something went wrong" />,
        //   { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        // )
        // }

        // ** if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false;

              // ** Update accessToken in localStorage
              this.setToken(r.data.payload.PAT);
              this.setRefreshToken(r.data.payload.resfreshToken);

              this.onAccessTokenFetched(r.data.payload.PAT);
            });
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // ** Make sure to assign accessToken according to your response.
              // ** Check: https://pixinvent.ticksy.com/ticket/2413870
              // ** Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args);
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args);
  }

  refreshToken() {
    return axios.get(this.jwtConfig.refreshEndpoint);
    // , {
    // refreshToken: this.getRefreshToken()
    // })
  }
  async get(url, config = {}) {
    return await axios
      .get(url, { ...config })
      .then((response) => response.data);
  }

  async post(url, data, config = {}) {
    return axios
      .post(url, { ...data }, { ...config })
      .then((response) => response.data);
  }

  async postfile(url, data, config) {
    return axios.post(url, data, config).then((response) => response.data);
  }

  async put(url, data, config = {}) {
    return axios
      .put(url, { ...data }, { ...config })
      .then((response) => response.data);
  }

  async del(url, config = {}) {
    return await axios
      .delete(url, { ...config })
      .then((response) => response.data);
  }
}
