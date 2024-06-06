import axios from 'axios';

const url = "http://192.168.30.58:31006/"
const BuildingService = {
  historic: "overview",
  energy_now: "energy/now",
  energy_totalpower: "energy/totalpower",
  energy_consumption: "energy/consumption",
  energy_generation: "energy/generation",
  energy_flexibility: "energy/flexibility",

  async getHistoric() {
    const path = url + this.historic
    try {
      const response = await axios.get(path);
      return response.data.historic
    } catch (error) {
      console.error(error);
    };
  },

  async getEnergyNow() {
    const path = url + this.energy_now
    try {
      const response = await axios.get(path);
      return { "consumption": response.data.consumption, "generation": response.data.generation, "flexibility": response.data.flexibility };
    } catch (error) {
      console.error(error);
      return { "consumption": 0, "generation": 0, "flexibility": 0 };
    };
  },
  async getEnergyTotalPower() {
    const path = url + this.energy_totalpower
    try {
      const response = await axios.get(path);
      return response.data.totalpower
    } catch (error) {
      console.error(error);
    };
  },
  async getEnergyConsumption() {
    const path = url + this.energy_consumption
    try {
      const response = await axios.get(path);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async getEnergyGeneration() {
    const path = url + this.energy_generation
    try {
      const response = await axios.get(path);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async getEnergyFlexibility() {
    const path = url + this.energy_flexibility
    try {
      const response = await axios.get(path);
      return response.data.flexibility
    } catch (error) {
      console.error(error);
    };
  },
  async getCorrelations() {
    const path = url + this.correlations
    try {
      const response = await axios.get(path);
      return response.data.correlations
    } catch (error) {
      console.error(error);
    };
  },
  async getBalance() {
    const path = url + this.balance
    try {
      const response = await axios.get(path);
      return response.data.balance
    } catch (error) {
      console.error(error);
    };
  }
};

export default BuildingService;
