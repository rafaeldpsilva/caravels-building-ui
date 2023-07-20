<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.consumption.title"
              :value="stats.consumption.value"
              :percentage="stats.consumption.percentage"
              :iconClass="stats.consumption.iconClass"
              :iconBackground="stats.consumption.iconBackground"
              :detail="stats.consumption.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.generation.title"
              :value="stats.generation.value"
              :percentage="stats.generation.percentage"
              :iconClass="stats.generation.iconClass"
              :iconBackground="stats.generation.iconBackground"
              :detail="stats.generation.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.flexibility.title"
              :value="stats.flexibility.value"
              :percentage="stats.flexibility.percentage"
              :iconClass="stats.flexibility.iconClass"
              :iconBackground="stats.flexibility.iconBackground"
              :percentageColor="stats.flexibility.percentageColor"
              :detail="stats.flexibility.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2 mb-4">
              <building-overview />
            </div>
            <div class="card z-index-2">
              <building-forecast />
            </div>
          </div>
          <div class="col-lg-5">
            <demand-response-events-card />
          </div>
          <!--div class="col-lg-5">
            <carousel />
          </div-->
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import BuildingOverview from "./components/BuildingOverview.vue";
import BuildingForecast from "./components/BuildingForecast.vue";
import BuildingService from "../services/BuildingService.js"
//import Carousel from "./components/Carousel.vue";
import DemandResponseEventsCard from "./components/DemandResponseEventsCard.vue";

export default {
  name: "dashboard-default",
  data() {
    return {
      stats: {
        consumption: {
          title: "Consumption",
          value: "",
          //percentage: "+55%",
          iconClass: "fa fa-flash",
          detail: "updated 5 seconds ago",
          iconBackground: "bg-gradient-primary",
        },
        generation: {
          title: "Generation",
          value: "",
          //percentage: "+3%",
          iconClass: "fa fa-sun-o",
          iconBackground: "bg-gradient-danger",
          detail: "updated 5 seconds ago",
        },
        flexibility: {
          title: "Flexibility",
          value: "W",
          //percentage: "+55%",
          iconClass: "ni ni-sound-wave",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "updated 5 seconds ago",
        },
        sales: {
          title: "Sales",
          value: "$103,430",
          percentage: "+5%",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          detail: "than last month",
        },
      },
    };
  },
  methods: {  
    async updateMonitoringValues() {
      this.energyNow = await BuildingService.getEnergyNow(this.$store.state.uri,this.$store.state.token);
      this.stats.consumption.value = this.energyNow['consumption'].toFixed(2) + " W";
      this.stats.generation.value = this.energyNow['generation'].toFixed(2) + " W";
      this.stats.flexibility.value = this.energyNow['flexibility'].toFixed(2) + " W";
    }
  },
  mounted() {
    this.updateMonitoringValues();
    this.stats.consumption.value = "0 W";
    this.stats.generation.value = "0 W";
    this.stats.flexibility.value = "0 W";
  },
  components: {
    Card,
    BuildingOverview,
    BuildingForecast,
    // Carousel,
    DemandResponseEventsCard,
  },
};
</script>
