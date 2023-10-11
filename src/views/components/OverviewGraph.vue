<template>
    <v-chart class="chart" :option="option" autoresize/>
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
  components: {
    VChart,
  },
  props: {
    labels: [],
    consumption: [],
    generation: [],
    flexibility: [],
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  async mounted(){
    this.option.xAxis.data = this.labels;
    this.option.series[0].data = this.consumption
    this.option.series[1].data = this.generation
    this.option.series[2].data = this.flexibility
    await this.updateMonitoringValues()
    setInterval(() => {
      this.updateMonitoringValues();
    }, 5000);
  },
  methods: {
      async updateMonitoringValues() {
          this.energyNow = await BuildingService.getEnergyNow(localStorage.getItem("uri"),localStorage.getItem("token"));
          this.updateData(this.energyNow['consumption'],this.energyNow['generation'],this.energyNow['flexibility'])
      },
      updateData(consumption, generation, flexibility){
        this.option.series[0].data.shift(0);
        this.option.series[1].data.shift(0);
        this.option.series[2].data.shift(0);
        this.option.series[0].data.push(consumption)
        this.option.series[1].data.push(generation)
        this.option.series[2].data.push(flexibility)
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
