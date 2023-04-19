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

  async postGenerateToken(name, listOfResources, dataAggregation, timeAggregation, embargo, expirationInMinutes) {
    const payload = {
      "name": name,
      "listofresources": listOfResources,
      "dataaggregation": dataAggregation,
      "timeaggregation": timeAggregation,
      "embargo": embargo,
      "exp": expirationInMinutes
    }
    const path = `http://192.168.2.171:5006/tokens/generate`
    try{
      const response = await axios.post(path,payload);
      return response.data.token
    }catch(error) {
      console.error(error);
    };
  },
  async postSaveToken(token) {
    const payload = {
      "token": token
    }
    const path = `http://192.168.2.171:5006/tokens/save`
    try{
      const response = await axios.post(path,payload);
      return response.data
    }catch(error) {
      console.error(error);
    };
  }
};

export default TokenService;
