<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <Graph :labels="hours" :consumption="consumption"/>
    </div>
  </div>
</template>

<script>
import Graph from './ForecastGraph.vue'

export default {
  name: "building-forecast",
  components:{
    Graph
  },
  props: {
    title: {
      type: String,
      default: "Consumption Forecast",
    }
  },
  data() {
    return {
      consumption: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hours: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
    }
  },
};
</script>
