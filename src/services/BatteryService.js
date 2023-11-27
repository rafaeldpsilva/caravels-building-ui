import axios from 'axios';

const BatteryService = {
  batteries: "batteries",
  batteries_historic: "batteries/historic",
  charge_battery: "batteries/charge",

  async getBatteries(url, token) {
    const path = url + this.batteries + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.batteries
    } catch (error) {
      console.error(error);
    };
  },
  async getBatteriesHistoric(url, token) {
    const path = url + this.batteries_historic + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.historic
    } catch (error) {
      console.error(error);
    };
  },
  async postChargeBattery(url, token, battery, quantity) {
    let payload = {
      "battery": battery,
      "quantity": quantity,
    }
    const path = url + this.charge_battery + '?token=' + token
    try {
      const response = await axios.post(path, payload);
      return response.data
    } catch (error) {
      console.error(error);
    };
  }
};

export default BatteryService;
