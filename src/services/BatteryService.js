import axios from 'axios';

const BatteryService = {
  batteries : "batteries",
  batteries_historic : "batteries/historic",

  async getBatteries(url, token) {
    const path = url+this.batteries+'?token='+token
    try{
      const response = await axios.get(path);
      return response.data.batteries
    }catch(error) {
      console.error(error);
    };
  },
  async getBatteriesHistoric(url, token) {
    const path = url+this.batteries_historic+'?token='+token
    try{
      const response = await axios.get(path);
      return response.data.historic
    }catch(error) {
      console.error(error);
    };
  }
};

export default BatteryService;
