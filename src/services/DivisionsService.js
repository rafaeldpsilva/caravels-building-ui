import axios from 'axios';

const DivisionsService = {
  divisions: "divisions",
  create_division: "create/division",

  async getDivisions(url, token) {
    const path = url + this.divisions + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.iots
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
  }
};

export default DivisionsService;
