import axios from 'axios';

const IotService = {

  production_breakdown: "production/breakdown",

  async getProductionBreakdown(url, token) {
    const path = url + this.production_breakdown + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
};

export default IotService;
