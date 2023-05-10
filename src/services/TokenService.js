import axios from 'axios';

const TokenService = {
  baseURL : 'http://192.168.2.171:5006',
  token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29tbXVuaXR5IE9wZXJhdG9yIiwibGlzdF9vZl9yZXNvdXJjZXMiOlsiYWdncmVnYXRlZCIsImRpc2NyZXRlIiwiY29tbXVuaXR5X21hbmFnZXIiLCJhZG1pbiJdLCJkYXRhX2FnZ3JlZ2F0aW9uIjoiYWxsIiwidGltZV9hZ2dyZWdhdGlvbiI6ImFsbCIsImVtYmFyZ29fcGVyaW9kIjoiMTIzNTEyMyIsImV4cCI6MTcxMzU0MDk4Mn0.Mn7NycJse-gptdVe7_9Ozu218Q2JZ_IfoQqVpjMRQx8',
  tokens : "/tokens",
  tokens_generate : "/tokens/generate",
  tokens_check : "/tokens/check",
  tokens_save : "/tokens/save",
  tokens_revoke : "/tokens/revoke",

  async getTokens() {
    const path = this.baseURL+this.tokens+'?token='+this.token
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
    const path = this.baseURL+this.tokens_generate+'?token='+this.token
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
    const path = this.baseURL+this.tokens_check+'?token='+this.token
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
    const path = this.baseURL+this.tokens_save+'?token='+this.token
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
    const path = this.baseURL+this.tokens_revoke+'?token='+this.token
    try{
      const response = await axios.post(path,payload);
      return {"token": response.data.token, "datetime" : response.data.datetime, "active": response.data.active}
    }catch(error) {
      console.error(error);
    };
  }
};

export default TokenService;
