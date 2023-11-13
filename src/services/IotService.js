import axios from 'axios';

const IotService = {
  iots: "iots",
  iots_historic: "iot/historic",

  async getIots(url, token) {
    const path = url + this.iots + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.iots
    } catch (error) {
      console.error(error);
    };
  },
  async getIotHistoric(url, token, iot) {
    let payload = {
      "iot": iot
    }
    const path = url + this.iots_historic + '?token=' + token
    try {
      const response = await axios.post(path, payload);
      return response.data['historic']
    } catch (error) {
      console.error(error);
    };
  },
};

export default IotService;
