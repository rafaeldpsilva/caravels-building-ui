import axios from 'axios';

const BuildingService = {
  init() {
    this.communityOperatorURL = 'https://192.168.2.171:5000';
    this.baseURL = 'https://192.168.2.171:5006';
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoicmFmYWVsIiwiTGlzdCBvZiBSZXNvdXJjZXMiOiJyYWZhZWwiLCJEYXRhIEFnZ3JlZ2F0aW9uIjoicmFmYWVsIiwiVGltZSBBZ2dyZWdhdGlvbiI6InJhZmFlbCIsIkVtYmFyZ28gUGVyaW9kIjoicmFmYWVsIiwiZXhwIjoxNzE5NzQ0NDE3fQ.Dzz5-JyYVL5jqO9jYFFUmAUV3jtGKIIWD9E7RM5kjP8';
    this.historic = "/historic";
    this.iots = "/iots";
    this.energy_now = "/energy/now";
    this.energy_totalpower = "/energy/totalpower";
    this.energy_consumption = "/energy/consumption";
    this.energy_generation = "/energy/generation";
    this.energy_flexibility = "/energy/flexibility";
    this.correlations = "/correlations";
    this.forecast = "/forecast";
    this.forecast_consumption = "/forecast/consumption";
    this.forecast_flexibility = "/forecast/flexibility";
    this.audit_check = "/audit/check";
    this.forget = "/forget"
  },
  async getHistoric() {
    const path = `${this.baseURL}${this.historic}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.historic
    }catch(error) {
      console.error(error);
    };
  },
  async getIots() {
    const path = `${this.baseURL}${this.iots}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.iots
    }catch(error) {
      console.error(error);
    };
  },
  async getEnergyNow() {
    const path = `${this.baseURL}${this.historic}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return {"consumption": response.data.consumption, "generation" : response.data.generation, "flexibility": response.data.flexibility}
    }catch(error) {
      console.error(error);
    };
  },
  async getEnergyTotalPower() {
    const path = `${this.baseURL}${this.energy_totalpower}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.totalpower
    }catch(error) {
      console.error(error);
    };
  },
  async getEnergyConsumption() {
    const path = `${this.baseURL}${this.energy_consumption}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
  async getEnergyGeneration() {
    const path = `${this.baseURL}${this.energy_generation}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
  async getEnergyFlexibility() {
    const path = `${this.baseURL}${this.energy_flexibility}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.flexibility
    }catch(error) {
      console.error(error);
    };
  },
  async getCorrelations() {
    const path = `${this.baseURL}${this.correlations}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.correlations
    }catch(error) {
      console.error(error);
    };
  },
  async getForecastConsumption() {
    const path = `${this.baseURL}${this.forecast_consumption}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.forecasted_consumption
    }catch(error) {
      console.error(error);
    };
  },
  async getForecastFlexibility() {
    const path = `${this.baseURL}${this.forecast_flexibility}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.forecasted_flexibility
    }catch(error) {
      console.error(error);
    };
  },
  async getForecast() {
    const path = `${this.baseURL}${this.forecast}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.tokens
    }catch(error) {
      console.error(error);
    };
  },
  async getAuditCheck() {
    const path = `${this.baseURL}${this.audit_check}?token=${this.token}`
    try{
      const response = await axios.get(path);
      return response.data.response
    }catch(error) {
      console.error(error);
    };
  },
  async forgetUser(building) {
    const payload = {
      "building": building
    }
    const path = `${this.communityOperatorURL}${this.forget}?token=${this.token}`
    try{
      const response = await axios.post(path,payload);
      return response.data.deleted_data_count
    }catch(error) {
      console.error(error);
    };
  }
};

export default BuildingService;
