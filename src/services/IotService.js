import axios from 'axios';

const url = "http://192.168.30.58:31006/"
const IotService = {
  iots: "iots",
  iots_historic: "iot/historic",

  async getIots() {
    const path = url + this.iots
    try {
      const response = await axios.get(path);
      return response.data.iots
    } catch (error) {
      console.error(error);
    };
  },
  async getIotHistoric(iot) {
    let payload = {
      "iot": iot
    }
    const path = url + this.iots_historic
    try {
      const response = await axios.post(path, payload);
      return response.data['historic']
    } catch (error) {
      console.error(error);
    };
  },
};

export default IotService;
