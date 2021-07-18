import axios from "axios";
import TokenService from './storage.service';
const ApiUrl = process.env.REACT_APP_BACKEND || '';
console.log('dssss', ApiUrl);
const Api = {
  existToken: TokenService.getToken() ? true : false,
  setHeader() {
    if (TokenService.getToken()) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${TokenService.getToken()}`;
    }
  },
  async auth(query) {
    try {
      const response = await axios
        .get(`${ApiUrl}/auth${query}`)
      TokenService.saveToken(response.data.token);
      return {
        code: true,
        message: 'ok'
      }
    } catch (error) {
      return {
        code: error.response.status,
        message: error.statusText
      }
    }
  },
  async products(query) {
    try {
      const response = await axios
        .get(`${ApiUrl}/products`)
      return {
        code: false,
        message: 'ok',
        products: response.data.products
      }
    } catch (error) {
      console.log(error)
      return {
        code: '',
        message: ''
      }
    }
  },
  install() {
    window.location.href = `${ApiUrl}/install`;
  }
}

export default Api;