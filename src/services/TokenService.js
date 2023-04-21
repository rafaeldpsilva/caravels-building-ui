import axios from 'axios';

const TokenService = {
  init() {
    this.baseURL = 'https://192.168.2.171:5006';
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoicmFmYWVsIiwiTGlzdCBvZiBSZXNvdXJjZXMiOiJyYWZhZWwiLCJEYXRhIEFnZ3JlZ2F0aW9uIjoicmFmYWVsIiwiVGltZSBBZ2dyZWdhdGlvbiI6InJhZmFlbCIsIkVtYmFyZ28gUGVyaW9kIjoicmFmYWVsIiwiZXhwIjoxNzE5NzQ0NDE3fQ.Dzz5-JyYVL5jqO9jYFFUmAUV3jtGKIIWD9E7RM5kjP8';
    this.tokens = "/tokens";
    this.tokens_generate = "/tokens/generate";
    this.tokens_check = "/tokens/check";
    this.tokens_save = "/tokens/save";
    this.tokens_revoke = "/tokens/revoke";
  },

  async getTokens() {
    const path = `${this.baseURL}${this.tokens}?token=${this.token}`
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
      "list_of_resources": listOfResources,
      "data_aggregation": dataAggregation,
      "time_aggregation": timeAggregation,
      "embargo": embargo,
      "exp": expirationInMinutes
    }
    const path = `${this.baseURL}${this.tokens_generate}?token=${this.token}`
    try{
      const response = await axios.post(path,payload);
      return response.data.token
    }catch(error) {
      console.error(error);
    };
  },
  
  async postCheckToken(token) {
    const payload = {
      "token": token
    }
    const path = `${this.baseURL}${this.tokens_check}?token=${this.token}`
    try{
      const response = await axios.post(path,payload);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },

  async postSaveToken(token) {
    const payload = {
      "token": token
    }
    const path = `${this.baseURL}${this.tokens_save}?token=${this.token}`
    try{
      const response = await axios.post(path,payload);
      return {"token": response.data.token, "datetime" : response.data.datetime, "active": response.data.active}
    }catch(error) {
      console.error(error);
    };
  },
  
  async postRevokeToken(token) {
    const payload = {
      "token": token
    }
    const path = `${this.baseURL}${this.tokens_revoke}?token=${this.token}`
    try{
      const response = await axios.post(path,payload);
      return {"token": response.data.token, "datetime" : response.data.datetime, "active": response.data.active}
    }catch(error) {
      console.error(error);
    };
  }
};

export default TokenService;
