<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <div class="row">
        <h6 class="col-md-6">{{ title }}</h6>
      </div>
    </div>
    <div class="p-3 card-body">
      <v-chart class="chart" :option="option" autoresize />
    </div>
  </div>
</template>
<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';
import RenDatahubService from "../../services/RenDatahubService.js"

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  LegendComponent
]);

export default defineComponent({
  name: "production-breakdown",
  components: {
    VChart,
  },
  props: {
    interval: [],
    unit: [],
    consumption: [],
    generation: [],
    flexibility: [],
    title: {
      type: String,
      default: "Production Overview",
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  async mounted() {
    const cena = await RenDatahubService.getProductionBreakdown(localStorage.getItem("uri"), localStorage.getItem("token"))
    for (var i = 0; i < 2; i++) {
      this.option.series.push({
        name: cena['series'][i]['name'],
        type: 'line',
        color: cena['series'][i]['color'],
        showSymbol: false,
        emphasis: {
          focus: 'series'
        },
        data: cena['series'][i]['data']
      })
    }
    for (i = 2; i < cena['series'].length; i++) {
      this.option.series.push({
        name: cena['series'][i]['name'],
        type: 'line',
        stack: 'Total',
        color: cena['series'][i]['color'],
        showSymbol: false,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: cena['series'][i]['data']
      })
    }
    this.option.legend.data = cena['labels']
    this.option.xAxis.data = cena['legend']
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: []
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            "00:00",
            "00:15",
            "00:30",
            "00:45",
            "01:00",
            "01:15",
            "01:30",
            "01:45",
            "02:00",
            "02:15",
            "02:30",
            "02:45",
            "03:00",
            "03:15",
            "03:30",
            "03:45",
            "04:00",
            "04:15",
            "04:30",
            "04:45",
            "05:00",
            "05:15",
            "05:30",
            "05:45",
            "06:00",
            "06:15",
            "06:30",
            "06:45",
            "07:00",
            "07:15",
            "07:30",
            "07:45",
            "08:00",
            "08:15",
            "08:30",
            "08:45",
            "09:00",
            "09:15",
            "09:30",
            "09:45",
            "10:00",
            "10:15",
            "10:30",
            "10:45",
            "11:00",
            "11:15",
            "11:30",
            "11:45",
            "12:00",
            "12:15",
            "12:30",
            "12:45",
            "13:00",
            "13:15",
            "13:30",
            "13:45",
            "14:00",
            "14:15",
            "14:30",
            "14:45",
            "15:00",
            "15:15",
            "15:30",
            "15:45",
            "16:00",
            "16:15",
            "16:30",
            "16:45",
            "17:00",
            "17:15",
            "17:30",
            "17:45",
            "18:00",
            "18:15",
            "18:30",
            "18:45",
            "19:00",
            "19:15",
            "19:30",
            "19:45",
            "20:00",
            "20:15",
            "20:30",
            "20:45",
            "21:00",
            "21:15",
            "21:30",
            "21:45",
            "22:00",
            "22:15",
            "22:30",
            "22:45",
            "23:00",
            "23:15",
            "23:30",
            "23:45",
            "24:00",
            ""
          ],
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} MW'
          },
        }
      ],
      series: []
    });
    return { option };
  },
});
</script>

<style scoped>
.chart {
  height: 30vh;
}
</style>