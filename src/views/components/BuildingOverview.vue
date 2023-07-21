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
        <canvas id="chart-line" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import BuildingService from "../../services/BuildingService.js"

export default {
  name: "building-overview",
  async created(){
    const overview = this.$store.state.overview
    if (overview.length == 0){
      await this.loadBuildingOverview();
    } else {
      this.hours = overview[0];
      this.consumption = overview[1];
      this.generation = overview[2];
      this.flexibility = overview[3];
    }
  },
  mounted(){
    this.createBuildingOverview();
  },
  props: {
    title: {
      type: String,
      default: "Building Overview",
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
      consumption: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      generation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      flexibility: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hours: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
    }
  },
  methods: {  
    async loadBuildingOverview() {
      await BuildingService.getHistoric(this.$store.state.uri,this.$store.state.token).then( historic => {
        let consumption = [];
        let generation = [];
        let flexibility = [];
        let hours = [];
        let i = 0;
        while (i < historic.length) {
            consumption.push(historic[i][0]);
            generation.push(historic[i][1]);
            flexibility.push(historic[i][2]);
            var dateObject = new Date(historic[i][3]);
            hours.push(dateObject.getUTCHours());
            i++;
        }
        this.consumption = consumption;
        this.generation = generation;
        this.flexibility = flexibility;
        this.hours = hours;
        this.$store.commit('saveOverview', [hours, consumption, generation, flexibility])
      });

    },
    createBuildingOverview() {
      var ctx1 = document.getElementById("chart-line").getContext("2d");

      var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

      gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
      gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
      gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");
      new Chart(ctx1, {
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
            {
              label: "Generation",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#f5365c",
              backgroundColor: gradientStroke1,
              // eslint-disable-next-line no-dupe-keys
              borderWidth: 3,
              fill: true,
              data: this.generation,
              maxBarThickness: 6,
            },
            {
              label: "Flexibility",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#2dce89",
              backgroundColor: gradientStroke1,
              // eslint-disable-next-line no-dupe-keys
              borderWidth: 3,
              fill: true,
              data: this.flexibility,
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
