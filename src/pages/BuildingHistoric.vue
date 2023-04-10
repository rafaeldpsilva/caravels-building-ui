<template>
<card>
    <section class="section-hero section-shaped my-0">
        <div class="shape shape-style-1 shape-default">
            
        </div>
        <div class="container shape-container d-flex align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <h1 class="display-2 text-white">Building Historic</h1>
                </div>
                <div>
                  <textarea v-model="token" class="form-control" id="exampleFormControlTextareaToken" rows="5" placeholder="Token"></textarea>
                </div>
                <p></p>
                <div class="btn-wrapper row justify-content-center align-items-center">
                    <base-button tag="a"
                                    class="mb-3 mb-sm-0 text-white"
                                    type="default"
                                    @click="onSubmit">
                        Get Historic
                    </base-button>
                </div>
                <p></p>
                <div>
                  <v-chart class="chart" :option="options"/>
                </div>
            </div>
        </div>
    </section>
</card>
</template>
<script>
import "flatpickr/dist/flatpickr.css";
import axios from 'axios';
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  data() {
    return { 
      token: '',
      consumption: '',
      labels : [],
      values: [],
      legenda: [],
      options: {
        title: {
          text: '    Consumption'
        },
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
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
        ]
      }
    };
  },
  methods: {
    getHistoric() {
      const path = `http://192.168.2.171:5000/building/historic?token=${this.token}`
      axios.get(path)
        .then((res) => {
          this.consumption = JSON.stringify(res.data, null, 2);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onSubmit(e) {
      e.preventDefault();
      this.getHistoric();
      this.mounted();
    },

    mounted() {
      var obj = JSON.parse(this.consumption);
      var index = [];

      // build the index
      for (var x in obj) {
        index.push(x);
      }
      // sort the index
      index.sort(function (a, b) {    
        return a == b ? 0 : (a > b ? 1 : -1); 
      }); 

      //adicionar o datetime
      this.labels = Object.keys(obj)
      this.options.xAxis[0].data.push(...this.labels)

      //adicionar os recursos
      this.legenda = Object.keys(obj[index[0]])
      this.options.legend.data.push(...this.legenda)
      
      this.legenda.forEach((legenda, n) => {
          this.options.series.push({name: legenda,
            type: 'line',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: []})
      })

      //adicionar os valores do power
      this.labels.forEach((label, i) => {
        this.legenda.forEach((legenda, n) => {
          //values.push(obj[label][legenda]);
          this.options.series[n].data.push(obj[label][legenda]);
        })
      })
    }
  },
  
};
</script>
<style scoped>
.chart {
  height: 400px;
}
</style>
