<template>
  <div v-if="this.loading" class="fa-3x text-center">
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
  <v-chart v-else class="chart" :option="option" autoresize />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';
import BuildingService from "../../../services/BuildingService.js"
import ForecastService from "../../../services/ForecastService.js"
use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  name: "overview-graph-hour",
  components: {
    VChart,
  },
  props: {
    interval: [],
    unit: [],
    consumption: [],
    generation: [],
    flexibility: [],
  },
  data() {
    return {
      loading: true,
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  async mounted() {
    this.loading = true;
    this.nowHour = new Date().getHours();
    const overview = JSON.parse(localStorage.getItem("overview"))
    if (overview.length != 4 || this.nowHour != overview[0][23]) {
      await this.loadBuildingOverview();
    } else {
      this.option.xAxis.data = overview[0].slice(6);
      this.option.series[0].data = overview[1].slice(6);
      this.option.series[1].data = overview[2].slice(6);
      this.option.series[2].data = overview[3].slice(6);
    }
    console.log(this.nowHour.toString())
    
    let i = 0;
    while (i < 6) {
      this.option.xAxis.data.push(this.nowHour + i + 1)
      this.option.series[0].data.push(null)
      this.option.series[1].data.push(null)
      this.option.series[2].data.push(null)
      i++;
    }
    
    const forecast = JSON.parse(localStorage.getItem("forecast-overview"))
    if (forecast.length != 2) {
      await this.loadBuildingForecast(this.nowHour);
    } else {
      this.option.series[3].data = forecast[1];
      this.loading = false;
    }
    this.option.xAxis.axisPointer.value = this.nowHour.toString();
  },
  methods: {
    async loadBuildingForecast(hour) {
      await ForecastService.getForecastConsumption(localStorage.getItem("token")).then(forecast => {
        let consumption = [];
        let hours = [];
        let i = 0;
        while (i < 17) {
          consumption.push(null);
          hours.push(i);
          i++;
        }
        i = 0;
        while (i < 7) {
          consumption.push(forecast[i + hour].toFixed(2));
          hours.push(i);
          i++;
        }
        this.loading = false;
        this.option.series[3].data = consumption;
        localStorage.setItem("forecast-overview", JSON.stringify([hours, consumption]))
      });
    },
    async loadBuildingOverview() {
      await BuildingService.getHistoric(localStorage.getItem("uri"), localStorage.getItem("token")).then(historic => {
        let consumption = [];
        let generation = [];
        let flexibility = [];
        let hours = [];
        let i = 0;
        while (i < historic.length) {
          consumption.push(historic[i][1].toFixed(2));
          generation.push(historic[i][2].toFixed(2));
          flexibility.push(historic[i][3].toFixed(2));
          var dateObject = new Date(historic[i][0]);
          hours.push(dateObject.getUTCHours());
          i++;
        }
        this.loading = false;
        this.option.xAxis.data = hours.slice(6);
        this.option.series[0].data = consumption.slice(6);
        this.option.series[1].data = generation.slice(6);
        this.option.series[2].data = flexibility.slice(6);
        localStorage.setItem("overview", JSON.stringify([hours, consumption, generation, flexibility]))
      });

    },
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: 'axis',
        triggerOn: 'none',
      },
      legend: {
        data: ['Consumption', 'Generation', 'Flexibility']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisPointer: {
          triggerOn: 'none',
          value: '0',
          snap: true,
          lineStyle: {
            color: '#7581BD',
            width: 2
          },
          label: {
            show: true,
            backgroundColor: '#7581BD'
          },
          handle: {
            show: true,
            color: '#7581BD'
          }
        },
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Consumption',
          type: 'line',
          color: "#825ee4",
          showSymbol: false,
          data: []
        },
        {
          name: 'Generation',
          type: 'line',
          color: "#f5365c",
          showSymbol: false,
          data: []
        },
        {
          name: 'Flexibility',
          type: 'line',
          color: "#2dce89",
          showSymbol: false,
          data: []
        },
        {
          data: [],
          type: 'line',
          showSymbol: false,
          lineStyle: {
            color: '#825ee4',
            width: 2,
            type: 'dashed'
          },
        },
      ]
    }
    );
    return { option };
  },
});
</script>
<style scoped>
.chart {
  height: 30vh;
}
</style>

