<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
      <!--p class="text-sm">
        <i class="fa fa-arrow-up text-success"></i>
        <span class="font-weight-bold">{{detail1}}</span>
        {{detail2}}
      </p-->
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas id="building-forecast" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import BuildingService from "../../services/BuildingService.js"

export default {
  name: "building-forecast",
  async mounted(){
    const forecast = localStorage.getItem("forecast")
    if (forecast[0].length != 24){
      await this.loadBuildingForecast();
    } else {
      this.hours = forecast[0];
      this.consumption = forecast[1];
      this.createBuildingForecast();
    }
  },
/*   mounted(){
    this.createBuildingForecast();
  }, */
  props: {
    title: {
      type: String,
      default: "Consumption Forecast",
    },
    detail1: {
      type: String,
      default: "4% more",
    },
    detail2: {
      type: String,
      default: "in 2021",
    },
  },
  data() {
    return {
      chart: "",
      consumption: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      generation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      flexibility: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hours: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
    }
  },
  methods: {  
    async loadBuildingForecast() {
      await BuildingService.getForecastConsumption(localStorage.getItem("uri"),localStorage.getItem("token")).then( forecast => {
        let consumption = [];
        let hours = [];
        let i = 0;
        while (i < forecast.length) {
            consumption.push(forecast[i]);
            hours.push(i);
            i++;
        }
        this.consumption = consumption;
        this.hours = hours;
        localStorage.setItem("forecast", [hours, consumption])
        this.createBuildingForecast();
      });

    },
    createBuildingForecast() {
      var ctx1 = document.getElementById("building-forecast").getContext("2d");

      var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

      gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
      gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
      gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");
      this.chart = new Chart(ctx1, {
        type: "line",
        data: {
          labels: this.hours,
          datasets: [
            {
              label: "Consumption",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#825ee4",
              backgroundColor: gradientStroke1,
              // eslint-disable-next-line no-dupe-keys
              borderWidth: 3,
              fill: true,
              data: this.consumption,
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#fbfbfb",
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "#ccc",
                padding: 20,
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
          },
        },
      });
    }
  },
};
</script>
