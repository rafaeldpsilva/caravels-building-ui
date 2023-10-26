import axios from 'axios';

const BatteryService = {
  batteries : "batteries",

  async getBatteries(url, token) {
    const path = url+this.batteries+'?token='+token
    try{
      const response = await axios.get(path);
      return response.data.batteries
    }catch(error) {
      console.error(error);
    };
  }
};

export default BatteryService;
