import axios from 'axios';

const url = "http://192.168.30.58:31004/"
const ForecastService = {
  forecast: "forecast",
  forecast_consumption: "forecast/consumption",
  forecast_flexibility: "forecast/flexibility",

  async getForecastConsumption() {
    const path = url + this.forecast_consumption
    try {
      const response = await axios.get(path);
      return response.data.forecasted_consumption
    } catch (error) {
      console.error(error);
    };
  },
  async getForecastFlexibility() {
    const path = url + this.forecast_flexibility
    try {
      const response = await axios.get(path);
      return response.data.forecasted_flexibility
    } catch (error) {
      console.error(error);
    };
  },
  async getForecast() {
    const path = url + this.forecast
    try {
      const response = await axios.get(path);
      return response.data.tokens
    } catch (error) {
      console.error(error);
    };
  }
};

export default ForecastService;
