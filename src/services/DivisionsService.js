import axios from 'axios';

const DivisionsService = {
  divisions: "divisions",
  create_division: "divisions/create",
  ac_status:"divisions/acstatus",
  set_config_ac_status:"divisions/config/acstatus",

  async getDivisions(url, token) {
    const path = url + this.divisions + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.divisions
    } catch (error) {
      console.error(error);
    };
  },
  async postCreateDivision(url, token, name, iots) {
    let payload = {
      "name": name,
      "iots": iots,
    }
    const path = url + this.create_division + '?token=' + token
    try {
      const response = await axios.post(path, payload);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async getACStatus(url, token) {
    const path = url + this.ac_status + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.ac_status
    } catch (error) {
      console.error(error);
    };
  },
  async postSetConfigACStatus(url, token, outside_temperature_iot, outside_temperature_tag, temperature_iot, temperature_tag, humidity_iot, humidity_tag, light_iot, light_tag, division) {
    let payload = {
      "outside_temperature_iot": outside_temperature_iot,
      "outside_temperature_tag": outside_temperature_tag,
      "temperature_iot": temperature_iot,
      "temperature_tag": temperature_tag,
      "humidity_iot": humidity_iot,
      "humidity_tag": humidity_tag,
      "light_iot": light_iot,
      "light_tag": light_tag,
      "division": division
    }
    const path = url + this.set_config_ac_status + '?token=' + token
    try {
      const response = await axios.post(path, payload);
      return response.data
    } catch (error) {
      console.error(error);
    };
  }
};

export default DivisionsService;
