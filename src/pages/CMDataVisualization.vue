<template>
  <div>
    <v-chart class="chart" :option="options"/>
  </div>
</template>
<script>
  import NotificationTemplate from './Notifications/NotificationTemplate';
  import { BaseAlert } from '@/components';
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
      BaseAlert,
      VChart
    },
    data() {
      return {
        data: [],
        data1: [],
        now: new Date(),
        oneDay: 24 * 3600 * 1000,
        value: Math.random() * 1000,
        options: {
          title: {
            text: 'Community Operator Data Visualization'
          },
          legend: {
            data: ['Total Consumption', 'Generation'],
            orient: 'vertical',
            top: 'top'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0];
              var date = new Date(params.name);
              return (
                date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear() +
                ' : ' +
                params.value[1]
              );
            },
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'time',
            name: 'Time',
            nameTextStyle: {
              lineHeight: 70,
            },
            nameLocation: 'middle',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            name: 'Energy',
            nameTextStyle: {
              lineHeight: 100,
            },
            nameLocation: 'middle',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          series: [
            {
              name: 'Total Consumption',
              type: 'line',
              showSymbol: false,
              data: data
            },
            {
                name: 'Generation',
                type: 'line',
                showSymbol: false,
                data: data1
            }
          ]
        }
      };
    },
    methods: {
      getHistoric() {
        const path = `http://192.168.2.171:5001/building/total`
        axios.get(path)
          .then((res) => {
            this.data = JSON.stringify(res.data, null, 2);
          })
          .catch((error) => {
            console.error(error);
          });
      },
    }
  };
</script>
<style>
</style>
