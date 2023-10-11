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
      <Graph :labels="labels" :consumption="consumption" :generation="generation" :flexibility="flexibility"/>
    </div>
  </div>
</template>

<script>
import Graph from "./OverviewGraph.vue"

export default {
  name: "building-overview-second",
  components:{
    Graph
  },
  props: {
    title: {
      type: String,
      default: "Building Overview",
    }
  },
  data() {
    return {
      labels: ['-10s', '-9s','-8s', '-7s', '-6s','-5s', '-4s', '-3s', '-2s', '-1s'],
      consumption: [0,0,0,0,0,0,0,0,0,0],
      generation: [0,0,0,0,0,0,0,0,0,0],
      flexibility: [0,0,0,0,0,0,0,0,0,0],
    }
  }
};
</script>
