import axios from 'axios';

const BuildingService = {
  communityOperatorURL: 'http://192.168.2.171:5000',
  historic: "historic",
  energy_now: "energy/now",
  energy_totalpower: "energy/totalpower",
  energy_consumption: "energy/consumption",
  energy_generation: "energy/generation",
  energy_flexibility: "energy/flexibility",
  correlations: "correlations",
  forecast: "forecast",
  forecast_consumption: "forecast/consumption",
  forecast_flexibility: "forecast/flexibility",
  audit_check: "audit/check",
  forget: "forget",

  async getHistoric(url, token) {
    const path = url + this.historic + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.historic
    } catch (error) {
      console.error(error);
    };
  },

  async getEnergyNow(url, token) {
    const path = url + this.energy_now + '?token=' + token
    try {
      const response = await axios.get(path);
      return { "consumption": response.data.consumption, "generation": response.data.generation, "flexibility": response.data.flexibility };
    } catch (error) {
      console.error(error);
      return { "consumption": 0, "generation": 0, "flexibility": 0 };
    };
  },
  async getEnergyTotalPower(url, token) {
    const path = url + this.energy_totalpower + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.totalpower
    } catch (error) {
      console.error(error);
    };
  },
  async getEnergyConsumption(url, token) {
    const path = url + this.energy_consumption + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async getEnergyGeneration(url, token) {
    const path = url + this.energy_generation + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async getEnergyFlexibility(url, token) {
    const path = url + this.energy_flexibility + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.flexibility
    } catch (error) {
      console.error(error);
    };
  },
  async getCorrelations(url, token) {
    const path = url + this.correlations + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.correlations
    } catch (error) {
      console.error(error);
    };
  },
  async getForecastConsumption(url, token) {
    const path = url + this.forecast_consumption + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.forecasted_consumption
    } catch (error) {
      console.error(error);
    };
  },
  async getForecastFlexibility(url, token) {
    const path = url + this.forecast_flexibility + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.forecasted_flexibility
    } catch (error) {
      console.error(error);
    };
  },
  async getForecast(url, token) {
    const path = url + this.forecast + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.tokens
    } catch (error) {
      console.error(error);
    };
  },
  async getAuditCheck(url, token) {
    const path = url + this.audit_check + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.response
    } catch (error) {
      console.error(error);
    };
  },
  async forgetUser(url, token, building) {
    const payload = {
      "building": building
    }
    const path = this.communityOperatorURL + this.forget + '?token=' + token
    try {
      const response = await axios.post(path, payload);
      return response.data.deleted_data_count
    } catch (error) {
      console.error(error);
    };
  },
  async getBalance(url, token) {
    const path = url + this.balance + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.balance
    } catch (error) {
      console.error(error);
    };
  }
};

export default BuildingService;
