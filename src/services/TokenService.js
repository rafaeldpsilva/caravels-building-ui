import axios from 'axios';

const TokenService = {
  init() {
    this.baseURL = 'https://192.168.2.171:5006';
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoicmFmYWVsIiwiTGlzdCBvZiBSZXNvdXJjZXMiOiJyYWZhZWwiLCJEYXRhIEFnZ3JlZ2F0aW9uIjoicmFmYWVsIiwiVGltZSBBZ2dyZWdhdGlvbiI6InJhZmFlbCIsIkVtYmFyZ28gUGVyaW9kIjoicmFmYWVsIiwiZXhwIjoxNzE5NzQ0NDE3fQ.Dzz5-JyYVL5jqO9jYFFUmAUV3jtGKIIWD9E7RM5kjP8';
  },
  async getTokens() {
    const path = `http://192.168.2.171:5006/tokens?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.tokens
    }catch(error) {
      console.error(error);
    };
  },

  async generateToken(payload) {
    const path = `http://192.168.2.171:5006/tokens/generate`
    try{
      const response = await axios.post(path,payload);
      return response.data.tokens
    }catch(error) {
      console.error(error);
    };
  }
};

export default TokenService;
