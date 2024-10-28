import HttpClient from "./HttpClient";

const auth = {
  generateNonce: (data) => {
    return HttpClient.post('/auth/generate-nonce', data);
  },

  validateSignature: (data) => {
    return HttpClient.post('/auth/validate-signature', data);
  },

  checkIsLoggedIn: () => {
    return HttpClient.get('/auth/me');
  }
}

export default auth;