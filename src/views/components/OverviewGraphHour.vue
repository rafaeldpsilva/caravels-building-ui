<template>
  <div v-if="this.loading" class="fa-3x text-center">
    <i class="fas fa-circle-notch fa-spin" ></i>
  </div>
  <v-chart v-else class="chart" :option="option" autoresize/>
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
import BuildingService from "../../services/BuildingService.js"
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
  data(){
    return {
      loading: true,
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  async mounted(){
    this.loading = true;
    const overview = JSON.parse(localStorage.getItem("overview"))
    if (overview.length != 4){
      await this.loadBuildingOverview();
    } else {
      this.option.xAxis.data= overview[0];
      this.option.series[0].data = overview[1];
      this.option.series[1].data = overview[2];
      this.option.series[2].data = overview[3];
      this.loading = false;
    }
  },
  methods: {  
    async loadBuildingOverview() {
      await BuildingService.getHistoric(localStorage.getItem("uri"),localStorage.getItem("token")).then( historic => {
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
        this.loading = false;
        this.option.xAxis.data= hours;
        this.option.series[0].data = consumption;
        this.option.series[1].data = generation;
        this.option.series[2].data = flexibility;
        localStorage.setItem("overview", JSON.stringify([hours, consumption, generation, flexibility]))
      });

    },
  },
  setup() {
    const option = ref({
        tooltip: {
            trigger: 'axis'
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
            data: []
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
            }
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

