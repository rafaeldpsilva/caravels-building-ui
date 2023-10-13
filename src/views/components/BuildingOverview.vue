<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
        <div class="row">
          <h6 class="col-md-6">{{ title }}</h6>
          <!--p class="text-sm">
            <i class="fa fa-arrow-up text-success"></i>
            <span class="font-weight-bold">{{detail1}}</span>
            {{detail2}}
          </p-->
          <div class="col-md-6 d-flex justify-content-end align-items-center">
            <div class="form-check form-switch">
              <input @click="intervalChange()" v-model="second" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
              <label class="form-check-label" for="flexSwitchCheckDefault">{{ interval + unit }}</label>
            </div>
          </div>
      </div>
    </div>
    <div class="p-3 card-body">
      <Graph v-if="second" :interval="interval" :unit="unit" :consumption="consumption" :generation="generation" :flexibility="flexibility"></Graph>
      <GraphHour v-else :interval="interval" :unit="unit" :consumption="consumption" :generation="generation" :flexibility="flexibility"></GraphHour>
    </div>
  </div>
</template>

<script>
import Graph from "./OverviewGraph.vue"
import GraphHour from "./OverviewGraphHour.vue"

export default {
  name: "building-overview-second",
  components:{
    Graph,
    GraphHour
  },
  props: {
    title: {
      type: String,
      default: "Building Overview",
    }
  },
  computed: {
    activeComp() {
      if(this.second) {
        return 'overview-graph-seconds'
      }
      else {
        return 'overview-graph-hours'
      }
    }
  },
  data() {
    return {
      second: true,
      interval : 5,
      unit: 's',
      consumption: [0,0,0,0,0,0,0,0,0,0],
      generation: [0,0,0,0,0,0,0,0,0,0],
      flexibility: [0,0,0,0,0,0,0,0,0,0],
    }
  },
  methods:{
    intervalChange(){
      this.second = !this.second;
      if (this.second){
        this.interval = 5;
        this.unit = 's';
      }else{
        this.interval = 1;
        this.unit = 'h';
      }
    }
  }
};
</script>
