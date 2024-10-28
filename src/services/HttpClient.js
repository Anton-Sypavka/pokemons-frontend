import axios from "axios";
import localStorageService, { ACCESS_TOKEN } from "./localStorageService";

export const HTTP_METHODS = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

export default class HttpClient {
  static async __call(method, url, body = null, isSecondCall = false) {
    try {
      const headers = {
        Authorization: localStorageService.getToken(ACCESS_TOKEN) || ''
      }

      return await axios.request({
        method,
        url,
        data: body,
        headers
      });

    } catch (error) {
      if (error.response?.status === 401 && !isSecondCall) {

        try {
          const { data: { access_token, refresh_token } } = await axios.request({
            method: HTTP_METHODS.POST,
            url: `${process.env.REACT_APP_API}/auth/refresh`,
            data: {
              token: localStorageService.getToken('refresh_token')
            }
          });

          localStorageService.setTokens({ access_token, refresh_token });

          return this.__call(method, url, body, true);

        } catch (error) {

          throw new Error('Refresh token invalid');

        }
      }

      throw error
    }
  }

  static async get(endpoint) {
    const { data } = await this.__call(HTTP_METHODS.GET, `${process.env.REACT_APP_API}${endpoint}`);

    return data;
  }

  static async post(endpoint, body) {
    const { data } = await this.__call(HTTP_METHODS.POST, `${process.env.REACT_APP_API}${endpoint}`, body);

    return data;
  }
}